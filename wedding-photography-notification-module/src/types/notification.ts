export interface NotificationRequest {
  to: string;
  from: string;
  messageBody: string;
}

export interface NotificationHandler {
  getNotifications: () => Promise<NotificationRequest[]>;
}
