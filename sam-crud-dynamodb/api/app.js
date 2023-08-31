/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

const AWS = require('aws-sdk');
// const { nanoid } = require('nanoid');
AWS.config.update({
    region: 'ap-south-1'
});

exports.index = async (event, context) => {
    try {
        const docClient = new AWS.DynamoDB.DocumentClient()
        const data = await docClient.scan({
            TableName: 'users'
        }).promise()
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: data.Items
            })
        }
    } catch (err) {
        console.log(err);
        return {
            'statusCode': 400,
            'body': JSON.stringify({
                message: err
            })
        }
    }
};

exports.store = async (event, context) => {
    try {
        const docClient = new AWS.DynamoDB.DocumentClient()
        const data = JSON.parse(event.body)

        await docClient.put({
            TableName: 'users',
            Item: {
                id: Date.now().toString(),
                info: {
                    username: data.name,
                    email: data.email,
                    password: data.password
                }
            }
        }).promise()
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                name: data,
                // message: 'User Created Successfully'
            })
        }
    } catch (err) {
        console.log(err);
        return {
            'statusCode': 400,
            'body': JSON.stringify({
                message: err
            })
        }
    }
}

exports.deleteUser = async (event, context) => {
    try {
        const docClient = new AWS.DynamoDB.DocumentClient()
        const id = event.pathParameters.id

        await docClient.delete({
            TableName: 'users',
            Key: {
                id: id
            }
        }).promise()
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'User Deleted Successfully'
            })
        }
    } catch (err) {
        console.log(err);
        return {
            'statusCode': 400,
            'body': JSON.stringify({
                message: err
            })
        }
    }
}

exports.updateUser = async (event, context) => {
    try {
        const docClient = new AWS.DynamoDB.DocumentClient()
        const data = JSON.parse(event.body)

        await docClient.update({
            TableName: 'users',
            Key: {
                id: event.pathParameters.id
            },
            UpdateExpression: 'set info.username = :n, info.email = :e, info.password = :p',
            ExpressionAttributeValues: {
                ':n': data.name,
                ':e': data.email,
                ':p': data.password
            }
        }).promise()
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'User Updated Successfully'
            })
        }
    } catch (err) {
        console.log(err);
        return {
            'statusCode': 400,
            'body': JSON.stringify({
                message: err
            })
        }
    }
}