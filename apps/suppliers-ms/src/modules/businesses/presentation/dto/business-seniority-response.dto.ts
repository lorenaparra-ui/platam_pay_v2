import { ApiProperty } from '@nestjs/swagger';

export class BusinessSeniorityResponseDto {
  @ApiProperty()
  externalId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rangeStart: number;

  @ApiProperty()
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
