import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { NotificationRequest } from "../types/notification";
import { logger } from "./logger";
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const sqsClient = new SQSClient({});
const sesClient = new SESClient({});

export const sendNotificationRequestToQueue = async (
  request: NotificationRequest
) => {
  logger.info("==> Sending SQS notification", request);
  const { to, from, messageBody } = request;
  try {
    const command = new SendMessageCommand({
      QueueUrl: process.env.NOTIFICATION_MODULE_SQS_QUEUE,
      MessageAttributes: {
        To: {
          DataType: "String",
          StringValue: to,
        },
        From: {
          DataType: "String",
          StringValue: from,
        },
      },
      MessageBody: messageBody,
    });

    await sqsClient.send(command);
  } catch (error) {
    logger.error(
      "sendNotificationRequest - Failed to send notification request via SQS",
      error
    );
  }
};

export const sendEmail = async (
  to: string,
  from: string,
  subject: string,
  message: string
) => {
  try {
    const command = new SendEmailCommand({
      Source: from,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: message,
          },
        },
      },
    });
    await sesClient.send(command);
  } catch (error) {
    console.error("sendEmail - Failed to send email", error);
  }
};
