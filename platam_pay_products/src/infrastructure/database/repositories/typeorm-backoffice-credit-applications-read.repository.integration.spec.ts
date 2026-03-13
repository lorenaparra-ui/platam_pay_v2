import { TypeOrmBackofficeCreditApplicationsReadRepository } from "./typeorm-backoffice-credit-applications-read.repository";

describe("TypeOrmBackofficeCreditApplicationsReadRepository (integration-like)", () => {
  it("builds list query with filters and returns mapped queue level", async () => {
    const queryMock = jest.fn().mockResolvedValue([
      {
        application_id: "847",
        application_external_id: "550e8400-e29b-41d4-a716-446655440000",
        partner_external_id: "6e5a1a5f-79ca-4f35-90a9-11f91d57f632",
        partner_logo_url: null,
        customer_full_name: "Carlos Perez",
        customer_type: "PN",
        doc_type: "CC",
        doc_number: "3102759655",
        phone: "3102759655",
        email: "carlos@platam.co",
        sales_rep_name: "Laura Rios",
        requested_credit_line: "8000000",
        submission_date: "2026-03-01T00:00:00.000Z",
        queue_days: "6",
        status_code: "in_study",
        status_display_name: "En estudio",
        sort_value: "2026-03-01T00:00:00.000Z",
      },
    ]);
    const dataSource = { query: queryMock };

    const repository = new TypeOrmBackofficeCreditApplicationsReadRepository(
      dataSource as never,
    );

    const page = await repository.listCreditApplications({
      limit: 20,
      cursor: null,
      statusCodes: ["in_study"],
      partnerExternalId: "6e5a1a5f-79ca-4f35-90a9-11f91d57f632",
      search: "carlos",
      sortBy: "most_recent",
      warningQueueDays: 3,
      criticalQueueDays: 5,
    });

    const [sql, params] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(sql).toContain('FROM "credit_applications_bnpl" ca');
    expect(sql).toContain("st.code = ANY");
    expect(sql).toContain("p.external_id");
    expect(params).toContain("6e5a1a5f-79ca-4f35-90a9-11f91d57f632");
    expect(page.items[0]?.queueLevel).toBe("critical");
  });

  it("builds grouped status count query", async () => {
    const queryMock = jest.fn().mockResolvedValue([
      { status_code: "in_study", total: "5" },
      { status_code: "rejected", total: "2" },
    ]);
    const dataSource = { query: queryMock };
    const repository = new TypeOrmBackofficeCreditApplicationsReadRepository(
      dataSource as never,
    );

    const counts = await repository.getStatusCounts({
      partnerExternalId: null,
      search: null,
    });

    const [sql] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(sql).toContain("GROUP BY st.code");
    expect(counts[0]?.total).toBe(5);
  });
});
