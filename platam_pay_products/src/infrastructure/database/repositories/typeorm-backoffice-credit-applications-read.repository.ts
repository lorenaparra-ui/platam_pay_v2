import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import type {
  BackofficeCreditApplicationsReadRepositoryPort,
  BackofficeCreditApplicationsSortBy,
  GetBackofficeStatusCountsQuery,
  ListBackofficeActivePartnersQuery,
  ListBackofficeCreditApplicationsQuery,
} from "../../../modules/backoffice-credit-applications/domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeCreditApplicationListItem } from "../../../modules/backoffice-credit-applications/domain/models/backoffice-credit-application-list-item.model";
import type { BackofficeCreditApplicationStatusCount } from "../../../modules/backoffice-credit-applications/domain/models/backoffice-credit-application-status-count.model";
import type { BackofficeActivePartner } from "../../../modules/backoffice-credit-applications/domain/models/backoffice-active-partner.model";
import type { BackofficeCreditApplicationsPage } from "../../../modules/backoffice-credit-applications/domain/models/backoffice-credit-applications-page.model";
import {
  CREDIT_APPLICATION_STATUS_CODES,
  type CreditApplicationStatusCode,
} from "../../../modules/backoffice-credit-applications/domain/models/credit-application-status-code.model";

interface CursorPayload {
  sortByValue: string | number;
  id: number;
}

interface CreditApplicationListRow {
  application_id: string | number;
  application_external_id: string;
  partner_external_id: string | null;
  partner_logo_url: string | null;
  customer_full_name: string | null;
  customer_type: "PN" | "PJ" | null;
  doc_type: string | null;
  doc_number: string | null;
  phone: string | null;
  email: string | null;
  requested_credit_line: string | number | null;
  submission_date: Date | string | null;
  queue_days: string | number | null;
  status_code: CreditApplicationStatusCode | null;
  status_display_name: string | null;
  sort_value: string | number;
}

interface StatusCountRow {
  status_code: CreditApplicationStatusCode;
  total: string | number;
}

interface PartnerRow {
  partner_external_id: string;
  partner_name: string;
  logo_url: string | null;
}

@Injectable()
export class TypeOrmBackofficeCreditApplicationsReadRepository implements BackofficeCreditApplicationsReadRepositoryPort {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async listCreditApplications(
    query: ListBackofficeCreditApplicationsQuery,
  ): Promise<BackofficeCreditApplicationsPage> {
    const limit = Math.max(1, Math.min(query.limit, 100));
    const cursor = decodeCursor(query.cursor);

    const params: unknown[] = [];
    const whereClauses = [
      "1 = 1",
      `st.code = ANY(${pushParam(params, CREDIT_APPLICATION_STATUS_CODES)}::text[])`,
    ];

    this.appendSharedFilters(whereClauses, params, {
      partnerExternalId: query.partnerExternalId,
      search: query.search,
    });

    if (query.statusCodes.length > 0) {
      whereClauses.push(
        `st.code = ANY(${pushParam(params, query.statusCodes)}::text[])`,
      );
    }

    if (cursor) {
      whereClauses.push(
        this.buildCursorCondition(query.sortBy, cursor, params),
      );
    }

    const { orderBySql, sortExpression } = getSortSql(query.sortBy);
    const limitParam = pushParam(params, limit + 1);

    const sql = `
      SELECT
        ca.id AS application_id,
        ca.external_id AS application_external_id,
        p.external_id AS partner_external_id,
        p.logo_url AS partner_logo_url,
        CASE
          WHEN COALESCE(b.entity_type, '') = 'PJ' THEN
            COALESCE(NULLIF(b.legal_name, ''), NULLIF(b.trade_name, ''), NULLIF(b.business_name, ''))
          ELSE
            NULLIF(CONCAT_WS(' ', per.first_name, per.last_name), '')
        END AS customer_full_name,
        COALESCE(b.entity_type, CASE WHEN per.person_id IS NOT NULL THEN 'PN' ELSE NULL END) AS customer_type,
        per.doc_type AS doc_type,
        per.doc_number AS doc_number,
        u.phone AS phone,
        u.email AS email,
        ca.requested_credit_line AS requested_credit_line,
        ca.submission_date AS submission_date,
        CASE
          WHEN st.code = 'in_study' AND ca.submission_date IS NOT NULL THEN
            FLOOR(EXTRACT(EPOCH FROM (NOW() - ca.submission_date)) / 86400)::int
          ELSE NULL
        END AS queue_days,
        st.code AS status_code,
        st.display_name AS status_display_name,
        ${sortExpression} AS sort_value
      FROM "credit_applications" ca
      INNER JOIN "statuses" st
        ON st.id = ca.status_id
       AND st.entity_type = 'credit_applications_bnpl'
      LEFT JOIN "partners" p ON p.id = ca.partner_id
      LEFT JOIN "persons" per ON per.id = ca.person_id
      LEFT JOIN "users" u ON u.id = per.user_id
      LEFT JOIN "businesses" b ON b.id = COALESCE(ca.business_id, p.business_id)
      WHERE ${whereClauses.join("\n        AND ")}
      ORDER BY ${orderBySql}
      LIMIT ${limitParam}
    `;

    const rows = ensureArray<CreditApplicationListRow>(
      await this.dataSource.query(sql, params),
    );
    const hasMore = rows.length > limit;
    const pageRows = hasMore ? rows.slice(0, limit) : rows;

    const items = pageRows.map((row) =>
      this.toListItem(row, query.warningQueueDays, query.criticalQueueDays),
    );

    const lastRow = pageRows[pageRows.length - 1];
    const nextCursor =
      hasMore && lastRow
        ? encodeCursor(lastRow.sort_value, Number(lastRow.application_id))
        : null;

    return {
      items,
      hasMore,
      nextCursor,
      pageSize: limit,
    };
  }

  async getStatusCounts(
    query: GetBackofficeStatusCountsQuery,
  ): Promise<BackofficeCreditApplicationStatusCount[]> {
    const params: unknown[] = [];
    const whereClauses = [
      "1 = 1",
      `st.code = ANY(${pushParam(params, CREDIT_APPLICATION_STATUS_CODES)}::text[])`,
    ];

    this.appendSharedFilters(whereClauses, params, query);

    const sql = `
      SELECT
        st.code AS status_code,
        COUNT(*)::int AS total
      FROM "credit_applications" ca
      INNER JOIN "statuses" st
        ON st.id = ca.status_id
       AND st.entity_type = 'credit_applications_bnpl'
      LEFT JOIN "partners" p ON p.id = ca.partner_id
      LEFT JOIN "persons" per ON per.id = ca.person_id
      LEFT JOIN "businesses" b ON b.id = COALESCE(ca.business_id, p.business_id)
      WHERE ${whereClauses.join("\n        AND ")}
      GROUP BY st.code
    `;

    const rows = ensureArray<StatusCountRow>(
      await this.dataSource.query(sql, params),
    );
    return rows.map((row) => ({
      statusCode: row.status_code,
      total: Number(row.total),
    }));
  }

  async listActivePartners(
    query: ListBackofficeActivePartnersQuery,
  ): Promise<BackofficeActivePartner[]> {
    const params: unknown[] = [];
    const whereClauses = [`st.entity_type = 'partners'`, `st.code = 'active'`];

    if (query.search) {
      const searchPattern = `%${query.search.trim().toLowerCase()}%`;
      const searchParam = pushParam(params, searchPattern);
      whereClauses.push(
        `LOWER(COALESCE(NULLIF(b.trade_name, ''), NULLIF(b.legal_name, ''), NULLIF(b.business_name, ''), p.acronym, '')) LIKE ${searchParam}`,
      );
    }

    const sql = `
      SELECT
        p.external_id AS partner_external_id,
        COALESCE(NULLIF(b.trade_name, ''), NULLIF(b.legal_name, ''), NULLIF(b.business_name, ''), p.acronym, CONCAT('Partner ', p.id)) AS partner_name,
        p.logo_url AS logo_url
      FROM "partners" p
      INNER JOIN "statuses" st ON st.id = p.status_id
      LEFT JOIN "businesses" b ON b.id = p.business_id
      WHERE ${whereClauses.join("\n        AND ")}
      ORDER BY partner_name ASC
    `;

    const rows = ensureArray<PartnerRow>(
      await this.dataSource.query(sql, params),
    );
    return rows.map((row) => ({
      partnerExternalId: row.partner_external_id,
      partnerName: row.partner_name,
      logoUrl: row.logo_url,
    }));
  }

  private appendSharedFilters(
    whereClauses: string[],
    params: unknown[],
    query: {
      partnerExternalId: string | null;
      search: string | null;
    },
  ): void {
    if (query.partnerExternalId) {
      whereClauses.push(
        `p.external_id = ${pushParam(params, query.partnerExternalId)}::uuid`,
      );
    }

    if (query.search) {
      const normalizedSearch = query.search.trim().toLowerCase();
      const likeParam = pushParam(params, `%${normalizedSearch}%`);
      whereClauses.push(`
        (
          LOWER(NULLIF(CONCAT_WS(' ', per.first_name, per.last_name), '')) LIKE ${likeParam}
          OR LOWER(COALESCE(per.doc_number, '')) LIKE ${likeParam}
          OR LOWER(CAST(ca.id AS text)) LIKE ${likeParam}
          OR LOWER(CAST(ca.external_id AS text)) LIKE ${likeParam}
          OR LOWER(COALESCE(NULLIF(b.legal_name, ''), NULLIF(b.trade_name, ''), NULLIF(b.business_name, ''))) LIKE ${likeParam}
        )
      `);
    }
  }

  private buildCursorCondition(
    sortBy: BackofficeCreditApplicationsSortBy,
    cursor: CursorPayload,
    params: unknown[],
  ): string {
    if (sortBy === "most_recent") {
      const sortParam = pushParam(params, String(cursor.sortByValue));
      const idParam = pushParam(params, cursor.id);
      return `
        (
          COALESCE(ca.submission_date, ca.created_at) < ${sortParam}::timestamptz
          OR (
            COALESCE(ca.submission_date, ca.created_at) = ${sortParam}::timestamptz
            AND ca.id < ${idParam}
          )
        )
      `;
    }

    if (sortBy === "oldest") {
      const sortParam = pushParam(params, String(cursor.sortByValue));
      const idParam = pushParam(params, cursor.id);
      return `
        (
          COALESCE(ca.submission_date, ca.created_at) > ${sortParam}::timestamptz
          OR (
            COALESCE(ca.submission_date, ca.created_at) = ${sortParam}::timestamptz
            AND ca.id > ${idParam}
          )
        )
      `;
    }

    if (sortBy === "requested_credit_line_desc") {
      const sortParam = pushParam(params, Number(cursor.sortByValue));
      const idParam = pushParam(params, cursor.id);
      return `
        (
          COALESCE(ca.requested_credit_line, 0) < ${sortParam}::bigint
          OR (
            COALESCE(ca.requested_credit_line, 0) = ${sortParam}::bigint
            AND ca.id < ${idParam}
          )
        )
      `;
    }

    if (sortBy === "requested_credit_line_asc") {
      const sortParam = pushParam(params, Number(cursor.sortByValue));
      const idParam = pushParam(params, cursor.id);
      return `
        (
          COALESCE(ca.requested_credit_line, 0) > ${sortParam}::bigint
          OR (
            COALESCE(ca.requested_credit_line, 0) = ${sortParam}::bigint
            AND ca.id > ${idParam}
          )
        )
      `;
    }

    const sortParam = pushParam(params, Number(cursor.sortByValue));
    const idParam = pushParam(params, cursor.id);
    return `
      (
        CASE
          WHEN st.code = 'in_study' AND ca.submission_date IS NOT NULL THEN
            FLOOR(EXTRACT(EPOCH FROM (NOW() - ca.submission_date)) / 86400)::int
          ELSE -1
        END < ${sortParam}::int
        OR (
          CASE
            WHEN st.code = 'in_study' AND ca.submission_date IS NOT NULL THEN
              FLOOR(EXTRACT(EPOCH FROM (NOW() - ca.submission_date)) / 86400)::int
            ELSE -1
          END = ${sortParam}::int
          AND ca.id < ${idParam}
        )
      )
    `;
  }

  private toListItem(
    row: CreditApplicationListRow,
    warningQueueDays: number,
    criticalQueueDays: number,
  ): BackofficeCreditApplicationListItem {
    const queueDays = row.queue_days != null ? Number(row.queue_days) : null;
    const queueLevel =
      row.status_code === "in_study" && queueDays != null
        ? queueDays > criticalQueueDays
          ? "critical"
          : queueDays >= warningQueueDays
            ? "warning"
            : "neutral"
        : null;

    return {
      applicationId: Number(row.application_id),
      applicationExternalId: row.application_external_id,
      partnerExternalId: row.partner_external_id,
      partnerLogoUrl: row.partner_logo_url,
      customerFullName: row.customer_full_name,
      customerType: row.customer_type,
      docType: row.doc_type,
      docNumber: row.doc_number,
      phone: row.phone,
      email: row.email,
      salesRepName: null,
      requestedCreditLine:
        row.requested_credit_line != null
          ? Number(row.requested_credit_line)
          : null,
      submissionDate: row.submission_date
        ? new Date(row.submission_date)
        : null,
      queueDays,
      queueLevel,
      statusCode: row.status_code,
      statusDisplayName: row.status_display_name,
    };
  }
}

function pushParam(params: unknown[], value: unknown): string {
  params.push(value);
  return `$${params.length}`;
}

function ensureArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function encodeCursor(sortByValue: string | number, id: number): string {
  return Buffer.from(JSON.stringify({ sortByValue, id }), "utf-8").toString(
    "base64",
  );
}

function decodeCursor(cursor: string | null): CursorPayload | null {
  if (!cursor) return null;

  try {
    const parsed = JSON.parse(
      Buffer.from(cursor, "base64").toString("utf-8"),
    ) as CursorPayload;
    if (
      (typeof parsed.sortByValue !== "string" &&
        typeof parsed.sortByValue !== "number") ||
      typeof parsed.id !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function getSortSql(sortBy: BackofficeCreditApplicationsSortBy): {
  orderBySql: string;
  sortExpression: string;
} {
  if (sortBy === "oldest") {
    return {
      sortExpression: `COALESCE(ca.submission_date, ca.created_at)`,
      orderBySql: `COALESCE(ca.submission_date, ca.created_at) ASC, ca.id ASC`,
    };
  }

  if (sortBy === "requested_credit_line_desc") {
    return {
      sortExpression: `COALESCE(ca.requested_credit_line, 0)`,
      orderBySql: `COALESCE(ca.requested_credit_line, 0) DESC, ca.id DESC`,
    };
  }

  if (sortBy === "requested_credit_line_asc") {
    return {
      sortExpression: `COALESCE(ca.requested_credit_line, 0)`,
      orderBySql: `COALESCE(ca.requested_credit_line, 0) ASC, ca.id ASC`,
    };
  }

  if (sortBy === "queue_days_desc") {
    return {
      sortExpression: `
        CASE
          WHEN st.code = 'in_study' AND ca.submission_date IS NOT NULL THEN
            FLOOR(EXTRACT(EPOCH FROM (NOW() - ca.submission_date)) / 86400)::int
          ELSE -1
        END
      `,
      orderBySql: `
        CASE
          WHEN st.code = 'in_study' AND ca.submission_date IS NOT NULL THEN
            FLOOR(EXTRACT(EPOCH FROM (NOW() - ca.submission_date)) / 86400)::int
          ELSE -1
        END DESC,
        ca.id DESC
      `,
    };
  }

  return {
    sortExpression: `COALESCE(ca.submission_date, ca.created_at)`,
    orderBySql: `COALESCE(ca.submission_date, ca.created_at) DESC, ca.id DESC`,
  };
}
