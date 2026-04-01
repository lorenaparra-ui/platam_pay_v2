export const PARTNER_USER_SQS_RESULT_READER_PORT = Symbol(
  'PARTNER_USER_SQS_RESULT_READER_PORT',
);

export type PartnerUserSqsCompletedResult = Readonly<{
  user_external_id: string;
  person_external_id: string;
}>;

/** Lee resultados en transversal_schema.partner_create_user_sqs_idempotency tras procesar SQS. */
export interface PartnerUserSqsResultReaderPort {
  wait_for_completed_result(
    idempotency_key: string,
  ): Promise<PartnerUserSqsCompletedResult>;
}
