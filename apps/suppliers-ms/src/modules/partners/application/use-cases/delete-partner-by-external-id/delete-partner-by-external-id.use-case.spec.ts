import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { DeletePartnerByExternalIdUseCase } from './delete-partner-by-external-id.use-case';
import { DeletePartnerByExternalIdRequest } from './delete-partner-by-external-id.request';

const mock_repo = {
  delete_by_external_id: jest.fn(),
  find_all: jest.fn(),
  find_by_external_id: jest.fn(),
  create: jest.fn(),
  update_by_external_id: jest.fn(),
};

const VALID_UUID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

describe('DeletePartnerByExternalIdUseCase', () => {
  let use_case: DeletePartnerByExternalIdUseCase;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePartnerByExternalIdUseCase,
        { provide: PARTNER_REPOSITORY, useValue: mock_repo },
      ],
    }).compile();

    use_case = module.get(DeletePartnerByExternalIdUseCase);
  });

  it('elimina partner existente sin lanzar excepción', async () => {
    mock_repo.delete_by_external_id.mockResolvedValue(true);

    await expect(
      use_case.execute(new DeletePartnerByExternalIdRequest(VALID_UUID)),
    ).resolves.toBeUndefined();

    expect(mock_repo.delete_by_external_id).toHaveBeenCalledWith(VALID_UUID);
  });

  it('lanza NotFoundException cuando el partner no existe', async () => {
    mock_repo.delete_by_external_id.mockResolvedValue(false);

    await expect(
      use_case.execute(new DeletePartnerByExternalIdRequest(VALID_UUID)),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(mock_repo.delete_by_external_id).toHaveBeenCalledWith(VALID_UUID);
  });

  it('llama al repositorio solo una vez', async () => {
    mock_repo.delete_by_external_id.mockResolvedValue(true);

    await use_case.execute(new DeletePartnerByExternalIdRequest(VALID_UUID));

    expect(mock_repo.delete_by_external_id).toHaveBeenCalledTimes(1);
  });
});
