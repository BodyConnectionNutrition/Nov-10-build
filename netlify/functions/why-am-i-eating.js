const { handler } = require("./paid-tool");
exports.handler = event => handler({ ...event, queryStringParameters: { ...(event.queryStringParameters || {}), product: "why-am-i-eating" } });
