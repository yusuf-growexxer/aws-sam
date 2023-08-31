import {
    ReceiveMessageCommand,
    DeleteMessageCommand,
    SQSClient,
} from "@aws-sdk/client-sqs";

const client = new SQSClient({});
const QUEUE_URL = process.env.QUEUE_URL;

const receiveMessage = (queueUrl) =>
    client.send(
        new ReceiveMessageCommand({
            AttributeNames: ["SentTimestamp"],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ["All"],
            QueueUrl: queueUrl,
            VisibilityTimeout: 20,
            WaitTimeSeconds: 5,
        })
    );

export const handle = async () => {
    try {
        const { Messages } = await receiveMessage(QUEUE_URL);
        const newArray = [];
        if (Messages) {
            Messages.forEach(async (m) => {
                newArray.push(m.Body);
                console.log(m.Body);
                await client.send(
                    new DeleteMessageCommand({
                        QueueUrl: QUEUE_URL,
                        ReceiptHandle: m.ReceiptHandle,
                    })
                );
            });
        }
        return {
            statusCode: 200,
            body: JSON.stringify(newArray),
        };
    } catch (err) {
        console.log(err)
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }
};