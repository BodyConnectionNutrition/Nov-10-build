const TOOLS = {
  "why-am-i-eating": { priceEnv: "STRIPE_PRICE_ID", file: "why-am-i-eating.html", page: "/why-am-i-eating/" },
  "who-taught-you-to-eat": { priceEnv: "STRIPE_PRICE_WHO_TAUGHT_YOU_TO_EAT", file: "who-taught-you-to-eat.html", page: "/tools/who-taught-you-to-eat/" },
  "how-was-my-body-image-created": { priceEnv: "STRIPE_PRICE_BODY_IMAGE", file: "how-was-my-body-image-created.html", page: "/tools/how-was-my-body-image-created/" },
  "deconstructing-a-belief": { priceEnv: "STRIPE_PRICE_DECONSTRUCTING_BELIEF", file: "deconstructing-a-belief.html", page: "/tools/deconstructing-a-belief/" },
  "behavior-sequence": { amount: 2900, file: "behavior-sequence.html", page: "/tools/behavior-sequence/" },
  "permission-and-scarcity": { amount: 2900, file: "permission-and-scarcity.html", page: "/tools/permission-and-scarcity/" },
  "what-is-this-doing-for-me": { amount: 2900, file: "what-is-this-doing-for-me.html", page: "/tools/what-is-this-doing-for-me/" },
  "choice-has-conditions": { amount: 2900, file: "choice-has-conditions.html", page: "/tools/choice-has-conditions/" },
  "my-food-and-body-framework": { amount: 2900, file: "my-food-and-body-framework.html", page: "/tools/my-food-and-body-framework/" },
  "values-clarification": { priceId: "price_1U7NfFPfe7PZZ7IATKAFHLtm", file: "values-clarification.html", page: "/tools/values-clarification/" }
};

const PURCHASES = Object.fromEntries(Object.entries(TOOLS).map(([slug, config]) => [slug, { ...config, grants: [slug], returnPath: config.page }]));
Object.assign(PURCHASES, {
  "origins-beliefs-bundle": { priceId: "price_1U7OOQPfe7PZZ7IAuQ9NoPpR", returnPath: "/shop/#origins-beliefs", grants: ["who-taught-you-to-eat", "how-was-my-body-image-created", "deconstructing-a-belief", "values-clarification"] },
  "eating-patterns-bundle": { priceId: "price_1U7OOcPfe7PZZ7IAR6TL5xpr", returnPath: "/shop/#eating-patterns", grants: ["why-am-i-eating", "behavior-sequence", "permission-and-scarcity", "what-is-this-doing-for-me", "choice-has-conditions"] },
  "complete-toolkit-bundle": { priceId: "price_1U7OOdPfe7PZZ7IAGhWaTwZO", returnPath: "/shop/#complete-toolkit", grants: Object.keys(TOOLS) }
});

function configuredPrice(config) {
  if (config.priceId) return config.priceId;
  if (config.priceEnv) return process.env[config.priceEnv] || "";
  return "";
}

function purchaseMatches(session, items, config) {
  const rows = Array.isArray(items.data) ? items.data : [];
  const priceId = configuredPrice(config);
  if (priceId) return rows.some(item => item.price && item.price.id === priceId);
  return session.amount_total === config.amount && session.currency === "usd" && rows.some(item => item.amount_total === config.amount && item.price && item.price.currency === "usd");
}

module.exports = { TOOLS, PURCHASES, configuredPrice, purchaseMatches };
