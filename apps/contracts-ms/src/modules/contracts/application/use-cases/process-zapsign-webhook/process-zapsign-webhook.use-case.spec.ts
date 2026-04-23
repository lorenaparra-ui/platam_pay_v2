import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import { SIGNATURE_PROVIDER } from '@modules/contracts/domain/ports/signature-provider.port';
import { ProcessZapSignWebhookUseCase } from './process-zapsign-webhook.use-case';
import { Contract } from '@modules/contracts/domain/models/contract.models';

const now = new Date('2026-01-01T00:00:00.000Z');

describe('ProcessZapSignWebhookUseCase', () => {
  let use_case: ProcessZapSignWebhookUseCase;

  const mock_signature = {
    normalize_signed_webhook: jest.fn(),
    create_document_from_template: jest.fn(),
    cancel_document: jest.fn(),
    get_document_snapshot: jest.fn(),
  };

  const mock_repo = {
    find_by_zapsign_token: jest.fn(),
    update_by_external_id: jest.fn(),
    create: jest.fn(),
    find_by_external_id: jest.fn(),
    find_by_id: jest.fn(),
    find_page: jest.fn(),
    delete_by_external_id: jest.fn(),
  };

  const mock_config = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessZapSignWebhookUseCase,
        { provide: SIGNATURE_PROVIDER, useValue: mock_signature },
        { provide: CONTRACT_REPOSITORY, useValue: mock_repo },
        { provide: ConfigService, useValue: mock_config },
      ],
    }).compile();

    use_case = module.get(ProcessZapSignWebhookUseCase);
  });

  it('401 si el secret configurado no coincide', async () => {
    mock_config.get.mockImplementation((k: string) =>
      k === 'config.signature.zapsign.webhook_secret' ? 'expected' : undefined,
    );

    await expect(
      use_case.execute({ token: 'x' }, 'wrong'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('400 si normalize devuelve null', async () => {
    mock_config.get.mockReturnValue('');
    mock_signature.normalize_signed_webhook.mockReturnValue(null);

    await expect(use_case.execute({}, undefined)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('404 si no hay contrato con ese token', async () => {
    mock_config.get.mockReturnValue('');
    mock_signature.normalize_signed_webhook.mockReturnValue({
      provider_document_token: 'tok',
      provider_signer_token: 'sig',
      signed_at: new Date(),
      signed_file_url: 'https://signed.pdf',
      sign_url: null,
      ip_address: null,
      geo_latitude: null,
      geo_longitude: null,
      document_photo_url: null,
      document_verse_photo_url: null,
      selfie_photo_url: null,
      signature_image_url: null,
      raw_payload: {},
    });
    mock_repo.find_by_zapsign_token.mockResolvedValue(null);

    await expect(use_case.execute({ token: 'tok' }, undefined)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('actualiza contrato cuando todo es válido', async () => {
    mock_config.get.mockReturnValue('');
    mock_signature.normalize_signed_webhook.mockReturnValue({
      provider_document_token: 'tok',
      provider_signer_token: 'sig',
      signed_at: new Date('2026-06-01T12:00:00.000Z'),
      signed_file_url: 'https://signed.pdf',
      sign_url: null,
      ip_address: '1.1.1.1',
      geo_latitude: null,
      geo_longitude: null,
      document_photo_url: null,
      document_verse_photo_url: null,
      selfie_photo_url: null,
      signature_image_url: null,
      raw_payload: {},
    });

    const contract = new Contract(
      1,
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      null,
      5,
      'tok',
      10,
      null,
      null,
      { existing: true },
      now,
      now,
    );
    mock_repo.find_by_zapsign_token.mockResolvedValue(contract);
    mock_repo.update_by_external_id.mockResolvedValue(contract);

    await use_case.execute({ token: 'tok' }, undefined);

    expect(mock_repo.update_by_external_id).toHaveBeenCalledWith(
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      expect.objectContaining({
        signed_file_url: 'https://signed.pdf',
        form_answers_json: expect.objectContaining({
          existing: true,
          zapsign_webhook: expect.any(Object),
        }),
      }),
    );
  });
});
