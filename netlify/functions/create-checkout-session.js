const SITE = "https://bodyconnectionnutrition.com";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { Allow: "POST" }, body: "Method not allowed" };
  }

  const key = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!key || !priceId) {
    console.error("Stripe is not fully configured", { hasKey: Boolean(key), hasPriceId: Boolean(priceId) });
    return { statusCode: 500, body: "Stripe is not configured." };
  }

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("line_items[0][price]", priceId);
  body.set("line_items[0][quantity]", "1");
  body.set("customer_creation", "always");
  body.set("integration_identifier", "bcn_why_eating_nwqkzjfd");
  body.set("success_url", `${SITE}/why-am-i-eating/thank-you/?session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${SITE}/why-am-i-eating/?checkout=cancelled`);
  body.set("metadata[product_slug]", "why-am-i-eating");
  body.set("payment_intent_data[metadata][product_slug]", "why-am-i-eating");

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });
    const data = await response.json();
    if (!response.ok || !data.url) {
      console.error("Stripe checkout error", data);
      return { statusCode: 502, body: "Unable to start checkout." };
    }
    return { statusCode: 303, headers: { Location: data.url, "Cache-Control": "no-store" }, body: "" };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Unable to start checkout." };
  }
};
