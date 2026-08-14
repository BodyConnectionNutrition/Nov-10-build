const SITE = "https://bodyconnectionnutrition.com";

const PRODUCTS = {
  "who-taught-you-to-eat": {
    priceEnv: "STRIPE_PRICE_WHO_TAUGHT_YOU_TO_EAT",
    returnPath: "/tools/who-taught-you-to-eat/"
  },
  "how-was-my-body-image-created": {
    priceEnv: "STRIPE_PRICE_BODY_IMAGE",
    returnPath: "/tools/how-was-my-body-image-created/"
  },
  "deconstructing-a-belief": {
    priceEnv: "STRIPE_PRICE_DECONSTRUCTING_BELIEF",
    returnPath: "/tools/deconstructing-a-belief/"
  }
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { Allow: "POST" }, body: "Method not allowed" };
  }

  const params = new URLSearchParams(event.body || "");
  const product = params.get("product") || "";
  const config = PRODUCTS[product];
  if (!config) return { statusCode: 400, body: "Unknown product." };

  const key = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env[config.priceEnv];
  if (!key || !priceId) {
    const missing = [!key ? "STRIPE_SECRET_KEY" : null, !priceId ? config.priceEnv : null].filter(Boolean).join(", ");
    console.error("Paid tool is not fully configured", { product, missing });
    return { statusCode: 500, headers: { "Content-Type": "text/plain; charset=utf-8" }, body: `Checkout configuration is missing: ${missing}` };
  }

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("line_items[0][price]", priceId);
  body.set("line_items[0][quantity]", "1");
  body.set("customer_creation", "always");
  body.set("success_url", `${SITE}/tool-purchase/thank-you/?product=${encodeURIComponent(product)}&session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${SITE}${config.returnPath}?checkout=cancelled`);
  body.set("metadata[product_slug]", product);
  body.set("payment_intent_data[metadata][product_slug]", product);

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
      const message = data && data.error && data.error.message ? data.error.message : "Unable to start checkout.";
      return { statusCode: 502, headers: { "Content-Type": "text/plain; charset=utf-8" }, body: `Stripe checkout error: ${message}` };
    }
    return { statusCode: 303, headers: { Location: data.url, "Cache-Control": "no-store" }, body: "" };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, headers: { "Content-Type": "text/plain; charset=utf-8" }, body: `Checkout error: ${error && error.message ? error.message : "Unable to start checkout."}` };
  }
};