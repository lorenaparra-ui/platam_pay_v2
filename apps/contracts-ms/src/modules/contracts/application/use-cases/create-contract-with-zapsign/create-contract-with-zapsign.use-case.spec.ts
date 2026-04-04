import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import { SIGNATURE_PROVIDER } from '@modules/contracts/domain/ports/signature-provider.port';
import { CreateContractWithZapsignUseCase } from './create-contract-with-zapsign.use-case';
import { Contract } from '@modules/contracts/domain/models/contract.models';

const now = new Date('2026-01-01T00:00:00.000Z');

const contract_fixture = new Contract(
  1,
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  null,
  5,
  'zapsign-doc-token',
  10,
  'https://orig.example/doc.pdf',
  null,
  { zapsign: { signer_token: 's1' } },
  now,
  now,
);

describe('CreateContractWithZapsignUseCase', () => {
  let use_case: CreateContractWithZapsignUseCase;

  const mock_signature = {
    create_document_from_template: jest.fn(),
    cancel_document: jest.fn(),
    get_document_snapshot: jest.fn(),
    normalize_signed_webhook: jest.fn(),
  };

  const mock_repo = {
    create: jest.fn(),
    find_by_zapsign_token: jest.fn(),
    find_by_external_id: jest.fn(),
    find_by_id: jest.fn(),
    find_page: jest.fn(),
    update_by_external_id: jest.fn(),
    delete_by_external_id: jest.fn(),
  };

  const mock_lookup = {
    get_user_internal_id_by_external_id: jest.fn(),
    get_application_internal_id_by_external_id: jest.fn(),
    get_contract_status_internal_id_by_external_id: jest.fn(),
    get_status_external_id_by_internal_id: jest.fn(),
    get_contract_template_internal_id_by_external_id: jest.fn(),
    get_default_contract_template_internal_id: jest.fn(),
    get_contract_template_external_id_by_internal_id: jest.fn(),
    get_zapsign_template_ref_by_internal_id: jest.fn(),
  };

  const mock_config = {
    get: jest.fn((key: string) => {
      if (key === 'config.signature.zapsign.sandbox_default') return true;
      if (key === 'config.signature.zapsign.folder_path_default') return '/contracts';
      return undefined;
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContractWithZapsignUseCase,
        { provide: SIGNATURE_PROVIDER, useValue: mock_signature },
        { provide: CONTRACT_REPOSITORY, useValue: mock_repo },
        { provide: CONTRACT_REFERENCE_LOOKUP, useValue: mock_lookup },
        { provide: ConfigService, useValue: mock_config },
      ],
    }).compile();

    use_case = module.get(CreateContractWithZapsignUseCase);
  });

  const base_input = {
    status_external_id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    signer_name: 'Test',
    signer_email: 't@test.com',
    signer_phone_country: '57',
    signer_phone_number: '3000000000',
    template_data: { campo: 'valor' },
  };

  it('rechaza si la plantilla no tiene zapsign_template_ref', async () => {
    mock_lookup.get_contract_status_internal_id_by_external_id.mockResolvedValue(10);
    mock_lookup.get_default_contract_template_internal_id.mockResolvedValue(5);
    mock_lookup.get_zapsign_template_ref_by_internal_id.mockResolvedValue(null);

    await expect(use_case.execute(base_input)).rejects.toBeInstanceOf(BadRequestException);
    expect(mock_signature.create_document_from_template).not.toHaveBeenCalled();
  });

  it('rechaza si no hay replacements ni template_data útil', async () => {
    mock_lookup.get_contract_status_internal_id_by_external_id.mockResolvedValue(10);
    mock_lookup.get_default_contract_template_internal_id.mockResolvedValue(5);
    mock_lookup.get_zapsign_template_ref_by_internal_id.mockResolvedValue('tpl-ref');

    await expect(
      use_case.execute({
        ...base_input,
        template_data: undefined,
        replacements: undefined,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('crea en ZapSign y persiste contrato', async () => {
    mock_lookup.get_contract_status_internal_id_by_external_id.mockResolvedValue(10);
    mock_lookup.get_default_contract_template_internal_id.mockResolvedValue(5);
    mock_lookup.get_zapsign_template_ref_by_internal_id.mockResolvedValue('tpl-zapsign-ref');
    mock_lookup.get_contract_template_external_id_by_internal_id.mockResolvedValue(
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    );
    mock_lookup.get_status_external_id_by_internal_id.mockResolvedValue(
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    );

    mock_signature.create_document_from_template.mockResolvedValue({
      provider_document_token: 'zapsign-doc-token',
      original_file_url: 'https://orig.example/doc.pdf',
      signer: { provider_signer_token: 's1', sign_url: 'https://sign.example/s' },
      raw_response: { token: 'zapsign-doc-token' },
    });

    mock_repo.create.mockResolvedValue(contract_fixture);

    const result = await use_case.execute(base_input);

    expect(result.external_id).toBe('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    expect(mock_signature.create_document_from_template).toHaveBeenCalledWith(
      expect.objectContaining({
        template_id: 'tpl-zapsign-ref',
        signer_email: 't@test.com',
      }),
    );
    expect(mock_repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        zapsign_token: 'zapsign-doc-token',
        contract_template_id: 5,
        status_id: 10,
      }),
    );
  });

  it('lanza NotFoundException si el status no existe', async () => {
    mock_lookup.get_contract_status_internal_id_by_external_id.mockResolvedValue(null);

    await expect(use_case.execute(base_input)).rejects.toBeInstanceOf(NotFoundException);
  });
});
