const crypto = require("crypto");
const PRODUCT_SLUG = "why-am-i-eating";

async function stripeGet(path) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const response = await fetch(`https://api.stripe.com${path}`, {
    headers: { Authorization: `Bearer ${key}` }
  });
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
  const sessionId = event.queryStringParameters && event.queryStringParameters.session_id;
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ ok: false, error: "Missing checkout session." })
    };
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    console.error("Stripe price is not configured");
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ ok: false, error: "Verification is temporarily unavailable." })
    };
  }

  try {
    const session = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}`);
    const items = await stripeGet(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}/line_items?limit=10`);
    const hasProduct = Array.isArray(items.data) && items.data.some(item => item.price && item.price.id === priceId);

    if (session.status !== "complete" || session.payment_status !== "paid" || !hasProduct) {
      return {
        statusCode: 403,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        body: JSON.stringify({ ok: false, error: "Purchase could not be verified." })
      };
    }

    const email = (session.customer_details && session.customer_details.email) || session.customer_email || "";
    const token = sign({ sid: session.id, product: PRODUCT_SLUG, email, v: 1 });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ ok: true, token, email })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ ok: false, error: "Verification is temporarily unavailable." })
    };
  }
};
