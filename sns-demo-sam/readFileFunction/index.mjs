import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

// Utility function to convert stream to string
const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        stream.on("error", reject);
    });

export const readFile = async (event) => {
    try {
        const bucketName = process.env.DataBucket;
        const fileName = 'hello-s3.txt';

        const params = {
            Bucket: bucketName,
            Key: fileName,
        };

        const data = await client.send(new GetObjectCommand(params));
        const content = await streamToString(data.Body);

        return {
            statusCode: 200,
            body: content,
        };
    } catch (error) {
        console.error('Error reading file:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error reading file!'),
        };
    }
};