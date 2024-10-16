import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as ses from "aws-cdk-lib/aws-ses";
import * as sqs from "aws-cdk-lib/aws-sqs";

class NotificationAggregatorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function for notification aggregator
    const notificationAggregatorLambda = new lambda.Function(
      this,
      "NotificationAggregatorLambda",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset(
          "path/to/your/notification-aggregator-code"
        ), // Replace with the actual path
      }
    );

    // Lambda function for email sender
    const emailSenderLambda = new lambda.Function(this, "EmailSenderLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("path/to/your/email-sender-code"), // Replace with the actual path
    });

    // Simple Queue Service (SQS) Queue
    const sqsQueue = new sqs.Queue(this, "NotificationQueue");

    // Grant the notification aggregator Lambda permission to send messages to the SQS queue
    sqsQueue.grantSendMessages(notificationAggregatorLambda);

    // Grant the email sender Lambda permission to receive messages from the SQS queue
    emailSenderLambda.addEventSource(
      new lambda.EventSource.SqsEventSource(sqsQueue)
    );

    // EventBridge rule to trigger the notification aggregator Lambda daily at 8 am
    const rule = new events.Rule(this, "DailyNotificationAggregatorRule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "8" }),
    });

    // Add the notification aggregator Lambda as a target for the EventBridge rule
    rule.addTarget(new targets.LambdaFunction(notificationAggregatorLambda));
  }
}

const app = new cdk.App();
new NotificationAggregatorStack(app, "NotificationAggregatorStack");
