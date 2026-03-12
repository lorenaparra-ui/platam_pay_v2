import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BusinessInformationApiPort } from '@transversal/domain/ports/business-information-api.port';
import { BusinessInformation } from '@transversal/domain/models/business-information.model';
import type { RuesApiResponse } from './rues-api.types';
import { parseLegalRepresentatives } from './rues-legal-rep-parser';

@Injectable()
export class RuesBusinessInformationApi implements BusinessInformationApiPort {
  constructor(private readonly configService: ConfigService) {}

  async getByTaxId(taxId: string): Promise<BusinessInformation | null> {
    const baseUrl = this.configService.get<string>('config.rues_api_base_url');
    if (!baseUrl) {
      throw new Error('config.rues_api_base_url (RUES_API_BASE_URL) no está definida');
    }
    const url = `${baseUrl.replace(/\/$/, '')}/api/scrape?nit=${encodeURIComponent(taxId)}`;

    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as RuesApiResponse;
    if (!data.success || !Array.isArray(data.results) || data.results.length === 0) {
      return null;
    }

    const first = data.results[0];
    const legalRepresentatives = parseLegalRepresentatives(first.legalRep);

    return new BusinessInformation(
      first.name ?? '',
      first.nit ?? taxId,
      legalRepresentatives,
    );
  }
}
