export const CREATE_PERSON_SQS_RESULT_READER_PORT = Symbol(
  'CREATE_PERSON_SQS_RESULT_READER_PORT',
);

export type CreatePersonSqsCompletedResult = Readonly<{
  user_external_id: string;
  person_external_id: string;
}>;

export interface CreatePersonSqsResultReaderPort {
  wait_for_completed_result(idempotency_key: string): Promise<CreatePersonSqsCompletedResult>;
}
