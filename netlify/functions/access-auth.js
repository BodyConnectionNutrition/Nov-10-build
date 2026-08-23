const crypto = require("crypto");
const { PURCHASES, TOOLS } = require("./shop-catalog");

const SITE = "https://bodyconnectionnutrition.com";
const COOKIE = "bcn_access";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const MAGIC_SECONDS = 60 * 15;

function secret() {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("Access signing is not configured");
  return process.env.ACCESS_TOKEN_SECRET;
}

function sign(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verify(token, type) {
  if (!token || !token.includes(".")) return null;
  const [encoded, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", secret()).update(encoded).digest("base64url");
  const a = Buffer.from(signature || ""), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (payload.type !== type || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("base64url").slice(0, 32);
}

async function stripe(path, options = {}) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const response = await fetch(`https://api.stripe.com${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${key}`, ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`Stripe request failed: ${response.status}`);
  return data;
}

async function updateCustomer(customerId, fields) {
  const body = new URLSearchParams();
  Object.entries(fields).forEach(([key, value]) => body.set(`metadata[${key}]`, value));
  return stripe(`/v1/customers/${encodeURIComponent(customerId)}`, {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString()
  });
}

async function customerEntitlements(email) {
  const query = encodeURIComponent(`email:'${email.replace(/[\\']/g, "")}'`);
  const found = await stripe(`/v1/customers/search?query=${query}&limit=20`);
  const customers = Array.isArray(found.data) ? found.data : [];
  const grants = new Set();
  for (const customer of customers) {
    const sessions = await stripe(`/v1/checkout/sessions?customer=${encodeURIComponent(customer.id)}&status=complete&limit=100`);
    for (const session of sessions.data || []) {
      if (session.payment_status !== "paid") continue;
      const slug = session.metadata && session.metadata.product_slug;
      if (slug && PURCHASES[slug]) PURCHASES[slug].grants.forEach(grant => grants.add(grant));
    }
  }
  return { customer: customers[0] || null, grants: [...grants] };
}

function parseDevices(customer) {
  try {
    const devices = JSON.parse((customer.metadata && customer.metadata.bcn_devices) || "[]");
    return Array.isArray(devices) ? devices.filter(d => d && d.h && d.t).slice(-3) : [];
  } catch { return []; }
}

async function createSession(customer, email, grants) {
  const deviceId = crypto.randomBytes(24).toString("base64url");
  const devices = [...parseDevices(customer), { h: hash(deviceId), t: Date.now() }].slice(-3);
  await updateCustomer(customer.id, { bcn_devices: JSON.stringify(devices), bcn_login_nonce: "" });
  const now = Math.floor(Date.now() / 1000);
  const token = sign({ type: "session", cid: customer.id, email, grants, did: deviceId, iat: now, exp: now + SESSION_SECONDS });
  return { token, devices };
}

function cookieHeader(token, maxAge = SESSION_SECONDS) {
  return `${COOKIE}=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function readCookie(event) {
  const raw = (event.headers && (event.headers.cookie || event.headers.Cookie)) || "";
  const match = raw.split(/;\s*/).find(part => part.startsWith(`${COOKIE}=`));
  return match ? decodeURIComponent(match.slice(COOKIE.length + 1)) : "";
}

async function validSession(event) {
  const payload = verify(readCookie(event), "session");
  if (!payload || !payload.cid || !payload.did || !Array.isArray(payload.grants)) return null;
  const customer = await stripe(`/v1/customers/${encodeURIComponent(payload.cid)}`);
  if (!parseDevices(customer).some(device => device.h === hash(payload.did))) return null;
  return { ...payload, customer };
}

function toolName(slug) {
  const names = {
    "why-am-i-eating": "Why Am I Eating?", "who-taught-you-to-eat": "Who Taught You to Eat?",
    "how-was-my-body-image-created": "How Was My Body Image Created?", "deconstructing-a-belief": "Deconstructing a Belief",
    "behavior-sequence": "Behavior Sequence", "permission-and-scarcity": "Permission & Scarcity",
    "what-is-this-doing-for-me": "What Is This Doing for Me?", "choice-has-conditions": "Choice Has Conditions",
    "my-food-and-body-framework": "My Food & Body Framework", "values-clarification": "Values Clarification"
  };
  return names[slug] || slug;
}

module.exports = { SITE, TOOLS, MAGIC_SECONDS, sign, verify, hash, stripe, updateCustomer, customerEntitlements, parseDevices, createSession, cookieHeader, readCookie, validSession, toolName };
