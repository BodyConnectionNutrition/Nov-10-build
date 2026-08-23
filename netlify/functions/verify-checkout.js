const { handler } = require("./verify-tool-checkout");
exports.handler = event => handler({ ...event, queryStringParameters: { ...(event.queryStringParameters || {}), product: "why-am-i-eating" } });
