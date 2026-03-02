import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  CreditApplicationBnplCreateInput,
  CreditApplicationBnplRepositoryPort,
  CreditApplicationBnplUpdateInput,
} from '../../../modules/credit-applications/domain/ports/credit-application-bnpl.repository.port';
import type { CreditApplicationBnpl } from '../../../modules/credit-applications/domain/models/credit-application-bnpl.model';
import { CreditApplicationBnplEntity } from '../entities/credit-application-bnpl.entity';
import { CreditApplicationBnplMapper } from '../mappers/credit-application-bnpl.mapper';

@Injectable()
export class TypeOrmCreditApplicationBnplRepository
  implements CreditApplicationBnplRepositoryPort
{
  constructor(
    @InjectRepository(CreditApplicationBnplEntity)
    private readonly repository: Repository<CreditApplicationBnplEntity>,
  ) {}

  async findAll(): Promise<CreditApplicationBnpl[]> {
    const entities = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    return entities.map((e) => CreditApplicationBnplMapper.toDomain(e));
  }

  async findById(id: number): Promise<CreditApplicationBnpl | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? CreditApplicationBnplMapper.toDomain(entity) : null;
  }

  async findByExternalId(
    externalId: string,
  ): Promise<CreditApplicationBnpl | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? CreditApplicationBnplMapper.toDomain(entity) : null;
  }

  async create(input: CreditApplicationBnplCreateInput): Promise<CreditApplicationBnpl> {
    const entity = CreditApplicationBnplMapper.toEntityFromCreateInput(input);
    const saved = await this.repository.save(entity);
    const full = await this.repository.findOne({ where: { id: saved.id } });
    if (!full) throw new Error('Credit application create: row not found after save');
    return CreditApplicationBnplMapper.toDomain(full);
  }

  async updateByExternalId(
    externalId: string,
    input: CreditApplicationBnplUpdateInput,
  ): Promise<CreditApplicationBnpl | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    if (!entity) return null;
    if (input.userId != null) entity.userId = input.userId;
    if (input.userProductId !== undefined) entity.userProductId = input.userProductId;
    if (input.partnerId !== undefined) entity.partnerId = input.partnerId;
    if (input.partnerCategoryId !== undefined) entity.partnerCategoryId = input.partnerCategoryId;
    if (input.salesRepId !== undefined) entity.salesRepId = input.salesRepId;
    if (input.businessId !== undefined) entity.businessId = input.businessId;
    if (input.numberOfLocations !== undefined) entity.numberOfLocations = input.numberOfLocations;
    if (input.numberOfEmployees !== undefined) entity.numberOfEmployees = input.numberOfEmployees;
    if (input.businessSeniority !== undefined) entity.businessSeniority = input.businessSeniority;
    if (input.sectorExperience !== undefined) entity.sectorExperience = input.sectorExperience;
    if (input.businessFlagshipM2 !== undefined) entity.businessFlagshipM2 = input.businessFlagshipM2;
    if (input.businessHasRent !== undefined) entity.businessHasRent = input.businessHasRent;
    if (input.businessRentAmount !== undefined) entity.businessRentAmount = input.businessRentAmount;
    if (input.monthlyIncome !== undefined) entity.monthlyIncome = input.monthlyIncome;
    if (input.monthlyExpenses !== undefined) entity.monthlyExpenses = input.monthlyExpenses;
    if (input.monthlyPurchases !== undefined) entity.monthlyPurchases = input.monthlyPurchases;
    if (input.currentPurchases !== undefined) entity.currentPurchases = input.currentPurchases;
    if (input.totalAssets !== undefined) entity.totalAssets = input.totalAssets;
    if (input.requestedCreditLine !== undefined) entity.requestedCreditLine = input.requestedCreditLine;
    if (input.isCurrentClient !== undefined) entity.isCurrentClient = input.isCurrentClient;
    if (input.statusId != null) entity.statusId = input.statusId;
    if (input.submissionDate !== undefined) entity.submissionDate = input.submissionDate;
    if (input.approvalDate !== undefined) entity.approvalDate = input.approvalDate;
    if (input.rejectionReason !== undefined) entity.rejectionReason = input.rejectionReason;
    if (input.creditStudyDate !== undefined) entity.creditStudyDate = input.creditStudyDate;
    if (input.creditScore !== undefined) entity.creditScore = input.creditScore != null ? String(input.creditScore) : null;
    if (input.creditDecision !== undefined) entity.creditDecision = input.creditDecision;
    if (input.approvedCreditLine !== undefined) entity.approvedCreditLine = input.approvedCreditLine;
    if (input.analystReport !== undefined) entity.analystReport = input.analystReport;
    if (input.riskProfile !== undefined) entity.riskProfile = input.riskProfile;
    if (input.privacyPolicyAccepted !== undefined) entity.privacyPolicyAccepted = input.privacyPolicyAccepted;
    if (input.privacyPolicyDate !== undefined) entity.privacyPolicyDate = input.privacyPolicyDate;
    await this.repository.save(entity);
    const updated = await this.repository.findOne({ where: { id: entity.id } });
    return updated ? CreditApplicationBnplMapper.toDomain(updated) : null;
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }
}
