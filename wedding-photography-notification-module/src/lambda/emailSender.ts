import { SQSHandler } from "aws-lambda";
import { logger } from "../util/logger";
import { sendEmail } from "../util/notification";

export const handler: SQSHandler = async (event) => {
  try {
    logger.info("==> starting email sender");

    await Promise.all(
      event.Records.map(async (record) =>
        sendEmail(
          record.messageAttributes["To"].stringValue as string,
          record.messageAttributes["From"].stringValue as string,
          record.messageAttributes["Subject"].stringValue as string,
          record.body
        )
      )
    );
  } catch (error) {
    logger.error("Failed to process SQS record", error);
  }
};
