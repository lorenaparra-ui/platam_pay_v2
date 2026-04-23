import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ContractCatalogStatus } from '@platam/shared';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import { CreateContractUseCase } from './create-contract.use-case';
import { Contract } from '@modules/contracts/domain/models/contract.models';

describe('CreateContractUseCase', () => {
  let use_case: CreateContractUseCase;
  const mock_repository = {
    create: jest.fn(),
  };
  const mock_lookup = {
    get_user_internal_id_by_external_id: jest.fn(),
    get_application_internal_id_by_external_id: jest.fn(),
    get_contract_catalog_status_by_external_id: jest.fn(),
    get_contract_status_external_id_by_catalog_status: jest.fn(),
    get_contract_template_internal_id_by_external_id: jest.fn(),
    get_default_contract_template_internal_id: jest.fn(),
    get_contract_template_external_id_by_internal_id: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContractUseCase,
        { provide: CONTRACT_REPOSITORY, useValue: mock_repository },
        { provide: CONTRACT_REFERENCE_LOOKUP, useValue: mock_lookup },
      ],
    }).compile();

    use_case = module.get(CreateContractUseCase);
  });

  it('rechaza si el usuario no existe', async () => {
    mock_lookup.get_user_internal_id_by_external_id.mockResolvedValue(null);

    await expect(
      use_case.execute({
        user_external_id: '11111111-1111-4111-8111-111111111111',
        status_external_id: '22222222-2222-4222-8222-222222222222',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(mock_repository.create).not.toHaveBeenCalled();
  });

  it('crea y devuelve respuesta pública', async () => {
    mock_lookup.get_user_internal_id_by_external_id.mockResolvedValue(10);
    mock_lookup.get_contract_catalog_status_by_external_id.mockResolvedValue(
      ContractCatalogStatus.PENDING,
    );
    mock_lookup.get_default_contract_template_internal_id.mockResolvedValue(99);
    mock_lookup.get_contract_status_external_id_by_catalog_status.mockResolvedValue(
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    );
    mock_lookup.get_contract_template_external_id_by_internal_id.mockResolvedValue(
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    );

    const created = new Contract(
      1,
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      10,
      99,
      null,
      ContractCatalogStatus.PENDING,
      null,
      null,
      null,
      new Date('2026-01-01T00:00:00.000Z'),
      new Date('2026-01-01T00:00:00.000Z'),
    );
    mock_repository.create.mockResolvedValue(created);

    const result = await use_case.execute({
      user_external_id: '11111111-1111-4111-8111-111111111111',
      status_external_id: '22222222-2222-4222-8222-222222222222',
    });

    expect(result.id).toBe(1);
    expect(result.external_id).toBe('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');
    expect(result.user_id).toBe(10);
    expect(result.status_external_id).toBe('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    expect(result.contract_template_external_id).toBe(
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    );
  });

  it('crea sin titular en users cuando no se envía user_external_id', async () => {
    mock_lookup.get_contract_catalog_status_by_external_id.mockResolvedValue(
      ContractCatalogStatus.PENDING,
    );
    mock_lookup.get_default_contract_template_internal_id.mockResolvedValue(99);
    mock_lookup.get_contract_status_external_id_by_catalog_status.mockResolvedValue(
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    );
    mock_lookup.get_contract_template_external_id_by_internal_id.mockResolvedValue(
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    );

    const created = new Contract(
      1,
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      null,
      99,
      null,
      ContractCatalogStatus.PENDING,
      null,
      null,
      null,
      new Date('2026-01-01T00:00:00.000Z'),
      new Date('2026-01-01T00:00:00.000Z'),
    );
    mock_repository.create.mockResolvedValue(created);

    const result = await use_case.execute({
      status_external_id: '22222222-2222-4222-8222-222222222222',
    });

    expect(mock_lookup.get_user_internal_id_by_external_id).not.toHaveBeenCalled();
    expect(mock_repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: null, credit_application_internal_id: null }),
    );
    expect(result.user_id).toBeNull();
  });
});
