import { Partner } from "@partners/domain/models/partner.model";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";

export class PartnersMapper {
  static toDomain(entity: PartnersEntity): Partner {
    return {
      id: entity.id,
      externalId: entity.externalId,
      countryCode: entity.countryCode,
      companyName: entity.companyName,
      tradeName: entity.tradeName,
      acronym: entity.acronym,
      logoUrl: entity.logoUrl,
      coBrandingLogoUrl: entity.coBrandingLogoUrl,
      primaryColor: entity.primaryColor,
      secondaryColor: entity.secondaryColor,
      lightColor: entity.lightColor,
      salesRepRoleName: entity.salesRepRoleName,
      salesRepRoleNamePlural: entity.salesRepRoleNamePlural,
      apiKeyHash: entity.apiKeyHash,
      notificationEmail: entity.notificationEmail,
      webhookUrl: entity.webhookUrl,
      sendSalesRepVoucher: entity.sendSalesRepVoucher,
      disbursementNotificationEmail: entity.disbursementNotificationEmail,
      defaultRepId: entity.defaultRepId,
      defaultCategoryId: entity.defaultCategoryId,
      statusId: entity.statusId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(domain: Partner): PartnersEntity {
    const entity = new PartnersEntity();
    entity.id = domain.id;
    entity.externalId = domain.externalId;
    entity.countryCode = domain.countryCode;
    entity.companyName = domain.companyName;
    entity.tradeName = domain.tradeName;
    entity.acronym = domain.acronym;
    entity.logoUrl = domain.logoUrl;
    entity.coBrandingLogoUrl = domain.coBrandingLogoUrl;
    entity.primaryColor = domain.primaryColor;
    entity.secondaryColor = domain.secondaryColor;
    entity.lightColor = domain.lightColor;
    entity.salesRepRoleName = domain.salesRepRoleName;
    entity.salesRepRoleNamePlural = domain.salesRepRoleNamePlural;
    entity.apiKeyHash = domain.apiKeyHash;
    entity.notificationEmail = domain.notificationEmail;
    entity.webhookUrl = domain.webhookUrl;
    entity.sendSalesRepVoucher = domain.sendSalesRepVoucher;
    entity.disbursementNotificationEmail = domain.disbursementNotificationEmail;
    entity.defaultRepId = domain.defaultRepId;
    entity.defaultCategoryId = domain.defaultCategoryId;
    entity.statusId = domain.statusId;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
