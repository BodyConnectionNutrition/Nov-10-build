const { PURCHASES, purchaseMatches } = require("./shop-catalog");
const { stripe, createSession, cookieHeader } = require("./access-auth");
exports.handler = async event => {
  const qs = event.queryStringParameters || {}, sessionId = qs.session_id || "", product = qs.product || "", config = PURCHASES[product];
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (!config || !sessionId.startsWith("cs_")) return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: "Missing or invalid checkout information." }) };
  try {
    const session = await stripe(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}`), items = await stripe(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}/line_items?limit=10`);
    if (session.status !== "complete" || session.payment_status !== "paid" || !purchaseMatches(session, items, config) || !session.metadata || session.metadata.product_slug !== product) return { statusCode: 403, headers, body: JSON.stringify({ ok: false, error: "Purchase could not be verified." }) };
    if (!session.customer) throw new Error("Checkout customer missing");
    const customer = await stripe(`/v1/customers/${encodeURIComponent(session.customer)}`), email = (session.customer_details && session.customer_details.email) || session.customer_email || customer.email || "";
    const { token } = await createSession(customer, email, config.grants);
    return { statusCode: 200, headers: { ...headers, "Set-Cookie": cookieHeader(token) }, body: JSON.stringify({ ok: true, product, grants: config.grants, email }) };
  } catch (error) { console.error(error); return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "Verification is temporarily unavailable." }) }; }
};
