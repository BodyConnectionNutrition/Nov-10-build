const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { TOOLS, PURCHASES, purchaseMatches } = require("./shop-catalog");

function verifyToken(token) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadPart, signature] = parts;
  const expected = crypto.createHmac("sha256", secret).update(payloadPart).digest("base64url");
  const a = Buffer.from(signature), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8"));
    if (!payload.sid || !payload.product) return null;
    if (!Array.isArray(payload.grants)) payload.grants = [payload.product];
    return payload;
  } catch { return null; }
}

async function stripeGet(apiPath) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const response = await fetch(`https://api.stripe.com${apiPath}`, { headers: { Authorization: `Bearer ${key}` } });
  if (!response.ok) throw new Error(`Stripe request failed: ${response.status}`);
  return response.json();
}

function html(statusCode, body) { return { statusCode, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow" }, body }; }

exports.handler = async event => {
  const qs = event.queryStringParameters || {}, product = qs.product || "", tool = TOOLS[product];
  if (!tool) return html(404, "<h1>Tool not found</h1>");
  const payload = verifyToken(qs.token || "");
  if (!payload || !payload.grants.includes(product)) return html(403, `<h1>Access link invalid</h1><p>Please return to the <a href="${tool.page}">product page</a>.</p>`);
  const purchase = PURCHASES[payload.product];
  if (!purchase) return html(403, "<h1>Purchase not recognized</h1>");
  try {
    const session = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(payload.sid)}`);
    const items = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(payload.sid)}/line_items?limit=10`);
    const metadataMatches = session.metadata && session.metadata.product_slug === payload.product;
    if (session.payment_status !== "paid" || session.status !== "complete" || !purchaseMatches(session, items, purchase) || !metadataMatches) return html(403, "<h1>Purchase not verified</h1><p>This access link is not connected to a completed purchase.</p>");
    let content = fs.readFileSync(path.join(__dirname, "private", tool.file), "utf8");
    content = content.replace("</body>", `<div class="product-return"><a href="/shop/">← Return to the shop</a></div></body>`);
    return html(200, content);
  } catch (error) {
    console.error(error);
    return html(500, "<h1>We could not verify access</h1><p>Please try again shortly.</p>");
  }
};
