export interface Contract {
  id: number;
  externalId: string;
  userId: number;
  applicationId: number | null;
  providerToken: string | null;
  statusId: number;
  originalFileUrl: string | null;
  signedFileUrl: string | null;
  formAnswersJson: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
