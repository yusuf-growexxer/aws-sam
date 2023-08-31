import * as aws from 'aws-sdk'

const s3 = new aws.S3({ apiVersion: '2006-03-01' })

export const lambdaHandler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;

    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
    const params = {
        Bucket: bucket,
        Key: key
    }

    try {
        const { ContentType } = await s3.getObject(params).promise()
        console.log(`Content type for key: ${key} is ${ContentType}`)
        return ContentType
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}