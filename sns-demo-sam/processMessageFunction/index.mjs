import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const processMessage = async (event) => {
    const message = event.Records[0].Sns.Message;
    const bucketName = process.env.DataBucket;
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: "hello-s3.txt",
        Body: message,
    });

    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};