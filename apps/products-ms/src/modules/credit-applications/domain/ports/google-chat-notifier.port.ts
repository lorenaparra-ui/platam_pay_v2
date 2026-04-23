export interface GoogleChatNotifierPort {
  notify_compliance(text: string): Promise<void>;
  notify_technical(text: string): Promise<void>;
  notify_analysts(text: string): Promise<void>;
}
