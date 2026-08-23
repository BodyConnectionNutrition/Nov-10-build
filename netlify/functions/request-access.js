const crypto = require("crypto");
const { SITE, MAGIC_SECONDS, sign, hash, updateCustomer, customerEntitlements } = require("./access-auth");

const generic = { statusCode: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ ok: true, message: "If that email is connected to a purchase, a sign-in link is on its way." }) };

exports.handler = async event => {
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: { Allow: "POST" }, body: "Method not allowed" };
  const email = String(new URLSearchParams(event.body || "").get("email") || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return generic;
  try {
    const { customer, grants } = await customerEntitlements(email);
    if (!customer || !grants.length) return generic;
    const nonce = crypto.randomBytes(24).toString("base64url");
    const now = Math.floor(Date.now() / 1000);
    await updateCustomer(customer.id, { bcn_login_nonce: hash(nonce) });
    const token = sign({ type: "magic", cid: customer.id, email, grants, nonce, iat: now, exp: now + MAGIC_SECONDS });
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`, "Content-Type": "application/json", "User-Agent": "body-connection-nutrition/1.0" },
      body: JSON.stringify({
        from: process.env.ACCESS_EMAIL_FROM || "Body Connection Nutrition <access@bodyconnectionnutrition.com>",
        to: [email], subject: "Your Body Connection Nutrition sign-in link",
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;max-width:560px"><h1 style="color:#31412f">Open your purchased tools</h1><p>This private sign-in link expires in 15 minutes and can be used once.</p><p><a href="${SITE}/.netlify/functions/activate-access?token=${encodeURIComponent(token)}" style="display:inline-block;background:#31412f;color:white;padding:12px 18px;border-radius:999px;text-decoration:none">Open My Tools</a></p><p>If you did not request this link, you can ignore this email.</p></div>`
      })
    });
    if (!response.ok) throw new Error(`Email provider failed: ${response.status}`);
    return generic;
  } catch (error) {
    console.error("Access email request failed", error);
    return generic;
  }
};
