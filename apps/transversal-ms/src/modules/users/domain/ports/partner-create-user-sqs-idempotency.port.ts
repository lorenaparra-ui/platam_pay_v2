export type PartnerCreateUserCachedResult = Readonly<{
  user_external_id: string;
  person_external_id: string;
}>;

export type PartnerCreateUserIdempotencyBeginResult =
  | { status: 'proceed' }
  | { status: 'duplicate'; result: PartnerCreateUserCachedResult }
  | { status: 'conflict' };

export interface PartnerCreateUserSqsIdempotencyPort {
  begin(
    key: string,
    correlation_id: string,
  ): Promise<PartnerCreateUserIdempotencyBeginResult>;

  complete(key: string, result: PartnerCreateUserCachedResult): Promise<void>;

  release(key: string): Promise<void>;
}
