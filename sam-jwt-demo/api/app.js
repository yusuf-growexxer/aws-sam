// const axios = require('axios')
const request = require('request')

exports.validateToken = async (event, context) => {
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
            'statusCode': 200,
            'body': JSON.stringify({
                message: err,
            })
        }
    }
};

exports.getToken = async (event, context, callback) => {
    try {
        const config = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            audience: process.env.AUDIENCE,
            grant_type: process.env.GRANT_TYPE
        }
        var options = {
            method: 'POST',
            url: process.env.URL,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(config)
        };
        const data = await token(options)
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: JSON.parse(data),
            })
        }
    } catch (err) {
        console.log(err);
        return {
            'statusCode': 400,
            'body': JSON.stringify({
                message: err,
            })
        }
    }
}

function token(option) {
    return new Promise((resolve, reject) => {
        request(option, function (error, response, body) {
            if (error) return reject(error)
            return resolve(body)
        })
    })
}