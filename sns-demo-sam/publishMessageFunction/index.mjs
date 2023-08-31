import { PublishCommand } from "@aws-sdk/client-sns";
import { SNSClient } from "@aws-sdk/client-sns";
const client = new SNSClient({ region: "ap-south-1" });

export const publishMessage = async (event, context) => {
    try {
        const topicArn = process.env.TOPIC_ARN;
        var params = {
            Message: "SNS Test Message", // MESSAGE_TEXT
            TopicArn: topicArn, //TOPIC_ARN
        };
        const data = await client.send(new PublishCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify('Message published successfully!'),
        };
    } catch (error) {
        console.error('Error publishing message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error publishing message'),
        };
    }
};