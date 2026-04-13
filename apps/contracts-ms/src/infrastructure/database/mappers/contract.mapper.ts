import { ContractEntity } from '@app/products-data';
import { ContractCatalogStatus } from '@platam/shared';
import { Contract } from '@modules/contracts/domain/models/contract.models';

function parse_contract_state(value: unknown): ContractCatalogStatus {
  if (
    value === ContractCatalogStatus.PENDING ||
    value === ContractCatalogStatus.SIGNED ||
    value === ContractCatalogStatus.CANCELLED
  ) {
    return value;
  }
  return ContractCatalogStatus.PENDING;
}

export class ContractMapper {
  static to_domain(row: ContractEntity): Contract {
    return new Contract(
      row.id,
      row.externalId,
      row.userId ?? null,
      row.contractTemplateId ?? null,
      row.zapsignToken ?? null,
      row.state,
      row.originalFileUrl ?? null,
      row.signedFileUrl ?? null,
      row.formAnswersJson ?? null,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): Contract {
    const form_json = row['form_answers_json'];
    return new Contract(
      Number(row['id']),
      String(row['external_id']),
      row['user_id'] === null || row['user_id'] === undefined
        ? null
        : Number(row['user_id']),
      row['contract_template_id'] === null || row['contract_template_id'] === undefined
        ? null
        : Number(row['contract_template_id']),
      row['zapsign_token'] === null || row['zapsign_token'] === undefined
        ? null
        : String(row['zapsign_token']),
      parse_contract_state(row['state']),
      row['original_file_url'] === null || row['original_file_url'] === undefined
        ? null
        : String(row['original_file_url']),
      row['signed_file_url'] === null || row['signed_file_url'] === undefined
        ? null
        : String(row['signed_file_url']),
      form_json !== null &&
      form_json !== undefined &&
      typeof form_json === 'object' &&
      !Array.isArray(form_json)
        ? (form_json as Record<string, unknown>)
        : null,
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
