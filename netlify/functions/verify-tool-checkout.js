const crypto = require("crypto");

const PRODUCTS = {
  "who-taught-you-to-eat": "STRIPE_PRICE_WHO_TAUGHT_YOU_TO_EAT",
  "how-was-my-body-image-created": "STRIPE_PRICE_BODY_IMAGE",
  "deconstructing-a-belief": "STRIPE_PRICE_DECONSTRUCTING_BELIEF"
};

async function stripeGet(path) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const response = await fetch(`https://api.stripe.com${path}`, { headers: { Authorization: `Bearer ${key}` } });
  if (!response.ok) throw new Error(`Stripe request failed: ${response.status}`);
  return response.json();
}

function sign(payload) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error("Access token signing is not configured");
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

exports.handler = async (event) => {
  const qs = event.queryStringParameters || {};
  const sessionId = qs.session_id || "";
  const product = qs.product || "";
  const priceEnv = PRODUCTS[product];
  if (!priceEnv || !sessionId.startsWith("cs_")) {
    return { statusCode: 400, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ ok: false, error: "Missing or invalid checkout information." }) };
  }

  const priceId = process.env[priceEnv];
  if (!priceId) {
    return { statusCode: 500, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ ok: false, error: "Verification is temporarily unavailable." }) };
  }

  try {
    const session = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}`);
    const items = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}/line_items?limit=10`);
    const hasProduct = Array.isArray(items.data) && items.data.some(item => item.price && item.price.id === priceId);
    const metadataMatches = session.metadata && session.metadata.product_slug === product;
    if (session.status !== "complete" || session.payment_status !== "paid" || !hasProduct || !metadataMatches) {
      return { statusCode: 403, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ ok: false, error: "Purchase could not be verified." }) };
    }
    const email = (session.customer_details && session.customer_details.email) || session.customer_email || "";
    const token = sign({ sid: session.id, product, email, v: 1 });
    return { statusCode: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ ok: true, token, product, email }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ ok: false, error: "Verification is temporarily unavailable." }) };
  }
};