const { verify, hash, stripe, createSession, cookieHeader } = require("./access-auth");

exports.handler = async event => {
  try {
    const payload = verify((event.queryStringParameters || {}).token || "", "magic");
    if (!payload || !payload.cid || !payload.nonce || !Array.isArray(payload.grants)) throw new Error("invalid");
    const customer = await stripe(`/v1/customers/${encodeURIComponent(payload.cid)}`);
    if (!customer.metadata || customer.metadata.bcn_login_nonce !== hash(payload.nonce)) throw new Error("used");
    const { token } = await createSession(customer, payload.email, payload.grants);
    return { statusCode: 303, headers: { Location: "/my-tools/", "Set-Cookie": cookieHeader(token), "Cache-Control": "no-store" }, body: "" };
  } catch (error) {
    return { statusCode: 303, headers: { Location: "/my-tools/?link=invalid", "Cache-Control": "no-store" }, body: "" };
  }
};
