const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PRODUCT_SLUG = "why-am-i-eating";

function verifyToken(token) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadPart, signature] = parts;
  const expected = crypto.createHmac("sha256", secret).update(payloadPart).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8"));
    if (payload.product !== PRODUCT_SLUG || !payload.sid) return null;
    return payload;
  } catch {
    return null;
  }
}

async function stripeGet(apiPath) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const response = await fetch(`https://api.stripe.com${apiPath}`, {
    headers: { Authorization: `Bearer ${key}` }
  });
  if (!response.ok) throw new Error(`Stripe request failed: ${response.status}`);
  return response.json();
}

exports.handler = async (event) => {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) throw new Error("Stripe price is not configured");

    const token = event.queryStringParameters && event.queryStringParameters.token;
    const payload = verifyToken(token);
    if (!payload) {
      return {
        statusCode: 403,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
        body: "<h1>Access link invalid</h1><p>Please return to the <a href='/why-am-i-eating/'>Why Am I Eating? product page</a>.</p>"
      };
    }

    const session = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(payload.sid)}`);
    const items = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(payload.sid)}/line_items?limit=10`);
    const hasProduct = Array.isArray(items.data) && items.data.some(item => item.price && item.price.id === priceId);

    if (session.payment_status !== "paid" || session.status !== "complete" || !hasProduct) {
      return {
        statusCode: 403,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
        body: "<h1>Purchase not verified</h1><p>This access link is not connected to a completed purchase.</p>"
      };
    }

    const toolPath = path.join(__dirname, "private", "why-am-i-eating.html");
    const html = fs.readFileSync(toolPath, "utf8");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow"
      },
      body: html
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      body: "<h1>We could not verify access</h1><p>Please try again shortly.</p>"
    };
  }
};
