'use strict';


exports.lambda_handler = async (event, context, callback) => {
    try {
        const response ={ statusCode: 200, body:"hello_world" };
        callback(null, response);
    } catch (e) {
        console.error(e);
        callback(e, null);
    }
};