const { PURCHASES, configuredPrice } = require("./shop-catalog");
const SITE = "https://bodyconnectionnutrition.com";

exports.handler = async event => {
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: { Allow: "POST" }, body: "Method not allowed" };
  const product = new URLSearchParams(event.body || "").get("product") || "";
  const config = PURCHASES[product];
  if (!config) return { statusCode: 400, body: "Unknown product." };
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return { statusCode: 500, body: "Checkout configuration is missing." };
  const body = new URLSearchParams();
  body.set("mode", "payment");
  const priceId = configuredPrice(config);
  if (priceId) body.set("line_items[0][price]", priceId);
  else if (config.amount) {
    body.set("line_items[0][price_data][currency]", "usd");
    body.set("line_items[0][price_data][unit_amount]", String(config.amount));
    body.set("line_items[0][price_data][product_data][name]", product);
    body.set("line_items[0][price_data][product_data][metadata][product_slug]", product);
  } else return { statusCode: 500, body: "Checkout price is not configured." };
  body.set("line_items[0][quantity]", "1");
  body.set("customer_creation", "always");
  body.set("integration_identifier", "bcn_shop_mzqkthva");
  body.set("success_url", `${SITE}/tool-purchase/thank-you/?product=${encodeURIComponent(product)}&session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${SITE}${config.returnPath}?checkout=cancelled`);
  body.set("metadata[product_slug]", product);
  body.set("payment_intent_data[metadata][product_slug]", product);
  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
    const data = await response.json();
    if (!response.ok || !data.url) return { statusCode: 502, body: "Unable to start checkout." };
    return { statusCode: 303, headers: { Location: data.url, "Cache-Control": "no-store" }, body: "" };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Unable to start checkout." };
  }
};
