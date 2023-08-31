import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

const client = new SQSClient({ region: "ap-south-1" }); // Replace "ap-south-1" with your desired region

export const handle = async (event) => {
    try {
        const QUEUE_URL = process.env.QUEUE_URL;
        const command = new SendMessageCommand({
            QueueUrl: QUEUE_URL,
            DelaySeconds: 10,
            MessageAttributes: {
                Title: {
                    DataType: "String",
                    StringValue: "Your First Test SQS Message",
                },
                Author: {
                    DataType: "String",
                    StringValue: "Testing",
                },
                WeeksOn: {
                    DataType: "Number",
                    StringValue: "6",
                },
            },
            MessageBody:
                "This is my first SQS Message, Test contents.",
        });

        const response = await client.send(command);
        console.log(response);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        }
    }
}