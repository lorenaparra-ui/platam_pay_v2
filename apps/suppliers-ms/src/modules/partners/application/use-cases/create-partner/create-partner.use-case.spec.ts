import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { SUPPLIERS_REFERENCE_LOOKUP } from '@common/ports/suppliers-reference-lookup.port';
import { DOMAIN_EVENT_BUS } from '@platam/shared';
import { CreatePartnerUseCase } from './create-partner.use-case';
import { CreatePartnerRequest } from './create-partner.request';
import { Partner } from '@modules/partners/domain/entities/partner.entity';
import { Statuses } from '@platam/shared';

const now = new Date('2026-01-01T00:00:00Z');

const partner_fixture = new Partner({
  internal_id: 1,
  supplier_id: 10,
  external_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  acronym: 'TEST',
  logo_url: null,
  co_branding_logo_url: null,
  primary_color: '#FF0000',
  secondary_color: null,
  light_color: null,
  notification_email: 'test@test.com',
  webhook_url: null,
  send_sales_rep_voucher: false,
  disbursement_notification_email: null,
  state: Statuses.ACTIVE,
  created_at: now,
  updated_at: now,
});

const mock_partner_repository = {
  create: jest.fn(),
  find_by_external_id: jest.fn(),
  find_all: jest.fn(),
  update_by_external_id: jest.fn(),
  delete_by_external_id: jest.fn(),
};

const mock_lookup = {
  get_supplier_external_id_by_internal_id: jest.fn(),
  get_person_internal_id_by_external_id: jest.fn(),
};

const mock_event_bus = {
  publish: jest.fn(),
  publish_many: jest.fn(),
  subscribe: jest.fn(),
};

const create_request = new CreatePartnerRequest(
  10,
  'TEST',
  null,
  null,
  '#FF0000',
  null,
  null,
  'test@test.com',
  null,
  false,
  null,
);

describe('CreatePartnerUseCase', () => {
  let use_case: CreatePartnerUseCase;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePartnerUseCase,
        { provide: PARTNER_REPOSITORY, useValue: mock_partner_repository },
        { provide: SUPPLIERS_REFERENCE_LOOKUP, useValue: mock_lookup },
        { provide: DOMAIN_EVENT_BUS, useValue: mock_event_bus },
      ],
    }).compile();

    use_case = module.get(CreatePartnerUseCase);
  });

  it('crea partner y retorna campos públicos', async () => {
    mock_partner_repository.create.mockResolvedValue(partner_fixture);
    mock_lookup.get_supplier_external_id_by_internal_id.mockResolvedValue(
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    );
    mock_event_bus.publish.mockResolvedValue(undefined);

    const result = await use_case.execute(create_request);

    expect(result.external_id).toBe('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    expect(result.supplier_external_id).toBe('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');
    expect(result.acronym).toBe('TEST');
    expect(result.state).toBe(Statuses.ACTIVE);
    expect(mock_partner_repository.create).toHaveBeenCalledTimes(1);
    expect(mock_partner_repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        supplier_id: 10,
        acronym: 'TEST',
        notification_email: 'test@test.com',
      }),
    );
  });

  it('despacha PartnerCreatedEvent después de crear', async () => {
    mock_partner_repository.create.mockResolvedValue(partner_fixture);
    mock_lookup.get_supplier_external_id_by_internal_id.mockResolvedValue(
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    );
    mock_event_bus.publish.mockResolvedValue(undefined);

    await use_case.execute(create_request);

    expect(mock_event_bus.publish).toHaveBeenCalledTimes(1);
    expect(mock_event_bus.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        partner_external_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        supplier_id: 10,
      }),
    );
  });

  it('lanza excepción si el supplier_external_id no existe (lookup falla)', async () => {
    mock_partner_repository.create.mockResolvedValue(partner_fixture);
    mock_lookup.get_supplier_external_id_by_internal_id.mockResolvedValue(null);
    mock_event_bus.publish.mockResolvedValue(undefined);

    await expect(use_case.execute(create_request)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });

  it('funciona sin event_bus opcional (no inyectado)', async () => {
    mock_partner_repository.create.mockResolvedValue(partner_fixture);
    mock_lookup.get_supplier_external_id_by_internal_id.mockResolvedValue(
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    );

    const module_no_bus: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePartnerUseCase,
        { provide: PARTNER_REPOSITORY, useValue: mock_partner_repository },
        { provide: SUPPLIERS_REFERENCE_LOOKUP, useValue: mock_lookup },
      ],
    }).compile();

    const uc_no_bus = module_no_bus.get(CreatePartnerUseCase);
    const result = await uc_no_bus.execute(create_request);
    expect(result.external_id).toBe('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
  });
});
