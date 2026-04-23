export class ListBusinessSenioritiesItemResponse {
  externalId: string;
  description: string;
  rangeStart: number;
  rangeEnd: number;

  constructor(data: {
    externalId: string;
    description: string;
    rangeStart: number;
    rangeEnd: number;
  }) {
    this.externalId = data.externalId;
    this.description = data.description;
    this.rangeStart = data.rangeStart;
    this.rangeEnd = data.rangeEnd;
  }
}
