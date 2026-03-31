import type { ContractReferenceLookupPort } from '@common/ports/contract-reference-lookup.port';
import type { Contract } from '../../domain/models/contract.models';
import { ContractPublicResponseDto } from '../../presentation/dto/contract-public-response.dto';

export async function build_contract_public_response(
  contract: Contract,
  lookup: ContractReferenceLookupPort,
): Promise<ContractPublicResponseDto> {
  const status_external_id =
    await lookup.get_status_external_id_by_internal_id(contract.status_id);
  const contract_template_external_id =
    contract.contract_template_id === null
      ? null
      : await lookup.get_contract_template_external_id_by_internal_id(
          contract.contract_template_id,
        );
  return new ContractPublicResponseDto({
    id: contract.internal_id,
    external_id: contract.external_id,
    user_id: contract.user_id,
    contract_template_external_id,
    status_external_id,
    original_file_url: contract.original_file_url,
    signed_file_url: contract.signed_file_url,
    form_answers_json: contract.form_answers_json,
    created_at: contract.created_at.toISOString(),
    updated_at: contract.updated_at.toISOString(),
  });
}
