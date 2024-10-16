import { EventBridgeHandler } from "aws-lambda";
import { connectToDB } from "../config/DBConnection";
import { logger } from "../util/logger";
import { NotificationHandler } from "../types/notification";
import { HalfPaymentBookingNotificationHandler } from "../notificationHandlers/HalfPaymentNotificationHandler";
import { sendNotificationRequestToQueue } from "../util/notification";

const notificationHandlers: NotificationHandler[] = [
  new HalfPaymentBookingNotificationHandler(),
];

export const handler: EventBridgeHandler<string, any, any> = async () => {
  logger.info("==> starting notification-handler");

  try {
    await connectToDB();

    const notificationRequests = await Promise.all(
      notificationHandlers.map((nh) => nh.getNotifications())
    );

    await Promise.all(
      notificationRequests
        .flat()
        .map((request) => sendNotificationRequestToQueue(request))
    );
    return true;
  } catch (error) {
    logger.error("Failed to execute notification-handler", error);
    return false;
  }
};
