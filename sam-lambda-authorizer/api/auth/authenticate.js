function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicyDocument(effect, methodArn)

    return {
        principalId,
        policyDocument
    }
}

function generatePolicyDocument(effect, methodArn) {
    if (!effect || !methodArn) return null;

    return {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    }
}

exports.tokenAuth = async (event, context) => {
    console.log("Event :- ", event)
    const token = event.authorizationToken.toLowerCase();
    const methodArn = event.methodArn

    switch (token) {
        case "allow":
            return generateAuthResponse('user', 'Allow', methodArn)
        default:
            return generateAuthResponse('user', 'Deny', methodArn)
    }
}

exports.requestAuth = async (event, context) => {
    try {
        const queryStringParams = event.queryStringParameters.auth
        const header = event.headers.approval

        const methodArn = event.methodArn

        if (header === 'true' && queryStringParams === 'true')
            return generateAuthResponse('user', 'Allow', methodArn)
        else
            return generateAuthResponse('user', 'Deny', methodArn)
    } catch (err) {
        return {
            err
        }
    }
}