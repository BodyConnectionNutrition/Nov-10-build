const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PRODUCTS = {
  "who-taught-you-to-eat": { priceEnv: "STRIPE_PRICE_WHO_TAUGHT_YOU_TO_EAT", file: "who-taught-you-to-eat.html", page: "/tools/who-taught-you-to-eat/" },
  "how-was-my-body-image-created": { priceEnv: "STRIPE_PRICE_BODY_IMAGE", file: "how-was-my-body-image-created.html", page: "/tools/how-was-my-body-image-created/" },
  "deconstructing-a-belief": { priceEnv: "STRIPE_PRICE_DECONSTRUCTING_BELIEF", file: "deconstructing-a-belief.html", page: "/tools/deconstructing-a-belief/" }
};

function verifyToken(token, product) {
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
    return payload.product === product && payload.sid ? payload : null;
  } catch { return null; }
}

async function stripeGet(apiPath) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const response = await fetch(`https://api.stripe.com${apiPath}`, { headers: { Authorization: `Bearer ${key}` } });
  if (!response.ok) throw new Error(`Stripe request failed: ${response.status}`);
  return response.json();
}

function html(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow" }, body };
}

exports.handler = async (event) => {
  const qs = event.queryStringParameters || {};
  const product = qs.product || "";
  const config = PRODUCTS[product];
  if (!config) return html(404, "<h1>Tool not found</h1>");

  const payload = verifyToken(qs.token || "", product);
  if (!payload) return html(403, `<h1>Access link invalid</h1><p>Please return to the <a href="${config.page}">product page</a>.</p>`);

  const priceId = process.env[config.priceEnv];
  if (!priceId) return html(500, "<h1>Access is temporarily unavailable</h1>");

  try {
    const session = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(payload.sid)}`);
    const items = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(payload.sid)}/line_items?limit=10`);
    const hasProduct = Array.isArray(items.data) && items.data.some(item => item.price && item.price.id === priceId);
    if (session.payment_status !== "paid" || session.status !== "complete" || !hasProduct) {
      return html(403, "<h1>Purchase not verified</h1><p>This access link is not connected to a completed purchase.</p>");
    }
    const toolPath = path.join(__dirname, "private", config.file);
    let tool = fs.readFileSync(toolPath, "utf8");
    tool = tool.replace("</body>", `<div style="position:fixed;right:18px;bottom:18px;z-index:9999"><a href="${config.page}" style="display:inline-block;background:#31412f;color:#fff;text-decoration:none;font:700 14px/1.2 system-ui;padding:10px 14px;border-radius:999px;box-shadow:0 4px 16px #0002">← Product page</a></div></body>`);
    return html(200, tool);
  } catch (error) {
    console.error(error);
    return html(500, "<h1>We could not verify access</h1><p>Please try again shortly.</p>");
  }
};