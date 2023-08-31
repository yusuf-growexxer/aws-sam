import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as fs from 'fs';
const client = new S3Client({});

export const upload = async (event, context) => {
    try {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: event,
            })
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 400,
            message: err
        };
    }
};
