export interface EmailSendRequest {
  readonly to: readonly string[];
  readonly subject: string;
  readonly html?: string;
  readonly text?: string;
  readonly from_override?: string;
}

export interface EmailSenderPort {
  send(request: EmailSendRequest): Promise<void>;
}

export const EMAIL_SENDER_PORT = Symbol('EMAIL_SENDER_PORT');
