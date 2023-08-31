exports.lambdaHandler = async (event, context) => {
    try {
        console.log("Handler :- ", event)
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: event,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
