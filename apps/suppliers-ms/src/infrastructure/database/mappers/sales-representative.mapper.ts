import { SalesRepresentativeEntity } from '@app/suppliers-data';
import { UserState } from '@platam/shared';
import {
  SalesRepresentative,
  type SalesRepresentativeLoadedUser,
} from '@modules/sales-representatives/domain/entities/sales-representative.entity';

export class SalesRepresentativeMapper {
  static to_domain(row: SalesRepresentativeEntity): SalesRepresentative {
    const user_id =
      row.userId === null || row.userId === undefined
        ? null
        : Number(row.userId);
    const user_full_name = SalesRepresentativeMapper.user_full_name_from_row(row);
    const loaded_user = SalesRepresentativeMapper.loaded_user_from_row(row);
    return new SalesRepresentative(
      Number(row.id),
      row.externalId,
      Number(row.partnerId),
      user_id,
      row.createdAt,
      row.updatedAt,
      user_full_name,
      row.is_default,
      loaded_user,
    );
  }

  private static user_full_name_from_row(row: SalesRepresentativeEntity): string | null {
    const p = row.user?.person;
    if (!p) {
      return null;
    }
    const s = `${p.firstName} ${p.lastName}`.trim();
    return s.length > 0 ? s : null;
  }

  private static loaded_user_from_row(
    row: SalesRepresentativeEntity,
  ): SalesRepresentativeLoadedUser | undefined {
    const u = row.user;
    if (!u?.person || !u.role) {
      return undefined;
    }
    const from_person = `${u.person.firstName} ${u.person.lastName}`.trim();
    const display_name =
      from_person.length > 0 ? from_person : (u.email ?? '').trim();
    if (!display_name) {
      return undefined;
    }
    return {
      external_id: u.externalId,
      display_name,
      role_name: u.role.name,
      state: u.state as UserState,
    };
  }

  static from_raw_row(row: Record<string, unknown>): SalesRepresentative {
    const user_raw = row['user_id'];
    return new SalesRepresentative(
      Number(row['id']),
      String(row['external_id']),
      Number(row['partner_id']),
      user_raw === null || user_raw === undefined ? null : Number(user_raw),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
      null,
      row['is_default'] === true,
    );
  }
}
