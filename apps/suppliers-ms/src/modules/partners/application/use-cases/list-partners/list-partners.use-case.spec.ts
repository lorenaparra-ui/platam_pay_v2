import { Test, TestingModule } from '@nestjs/testing';
import { PARTNER_REPOSITORY } from '@modules/partners/domain/repositories/partner.repository';
import { SUPPLIERS_REFERENCE_LOOKUP } from '@common/ports/suppliers-reference-lookup.port';
import { ListPartnersUseCase } from './list-partners.use-case';
import { Partner } from '@modules/partners/domain/entities/partner.entity';
import { PartnerState } from '@platam/shared';

const now = new Date('2026-01-01T00:00:00Z');

const make_partner = (n: number): Partner =>
  new Partner({
    internal_id: n,
    supplier_id: n * 10,
    external_id: `${String(n).padStart(8, '0')}-0000-4000-8000-000000000000`,
    acronym: `P${n}`,
    logo_url: null,
    co_branding_logo_url: null,
    primary_color: null,
    secondary_color: null,
    light_color: null,
    notification_email: null,
    webhook_url: null,
    send_sales_rep_voucher: false,
    disbursement_notification_email: null,
    state: PartnerState.ACTIVE,
    created_at: now,
    updated_at: now,
  });

const mock_repo = {
  find_all: jest.fn(),
  create: jest.fn(),
  find_by_external_id: jest.fn(),
  update_by_external_id: jest.fn(),
  delete_by_external_id: jest.fn(),
};

const mock_lookup = {
  get_supplier_external_id_by_internal_id: jest.fn(),
  get_person_internal_id_by_external_id: jest.fn(),
};

describe('ListPartnersUseCase', () => {
  let use_case: ListPartnersUseCase;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListPartnersUseCase,
        { provide: PARTNER_REPOSITORY, useValue: mock_repo },
        { provide: SUPPLIERS_REFERENCE_LOOKUP, useValue: mock_lookup },
      ],
    }).compile();

    use_case = module.get(ListPartnersUseCase);
  });

  it('retorna lista vacía cuando no hay partners', async () => {
    mock_repo.find_all.mockResolvedValue([]);

    const result = await use_case.execute();

    expect(result).toEqual([]);
    expect(mock_repo.find_all).toHaveBeenCalledTimes(1);
  });

  it('retorna partners mapeados con supplier_external_id', async () => {
    const partners = [make_partner(1), make_partner(2)];
    mock_repo.find_all.mockResolvedValue(partners);
    mock_lookup.get_supplier_external_id_by_internal_id.mockImplementation(
      (id: number) => `supplier-ext-${id}`,
    );

    const result = await use_case.execute();

    expect(result).toHaveLength(2);
    expect(result[0].acronym).toBe('P1');
    expect(result[0].supplier_external_id).toBe('supplier-ext-10');
    expect(result[1].acronym).toBe('P2');
    expect(result[1].supplier_external_id).toBe('supplier-ext-20');
  });

  it('llama al lookup una vez por partner', async () => {
    mock_repo.find_all.mockResolvedValue([make_partner(1), make_partner(2), make_partner(3)]);
    mock_lookup.get_supplier_external_id_by_internal_id.mockResolvedValue('supplier-ext');

    await use_case.execute();

    expect(mock_lookup.get_supplier_external_id_by_internal_id).toHaveBeenCalledTimes(3);
  });
});
