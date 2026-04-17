export interface BusinessSeniorityItem {
  externalId: string;
  description: string;
  rangeStart: number;
  rangeEnd: number;
}

export interface BusinessSeniorityRepository {
  find_all(): Promise<BusinessSeniorityItem[]>;
}
