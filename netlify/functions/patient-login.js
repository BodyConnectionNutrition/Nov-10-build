const crypto = require("crypto");

const COOKIE_NAME = "bcn_patient_tools";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function esc(value = "") {
  return String(value).replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));
}

function page(message) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Patient Tools | Body Connection Nutrition</title><style>:root{--d:#31412f;--i:#fbf7ef;--ink:#2e2b27;--mut:#6f665d;--line:rgba(46,43,39,.14)}*{box-sizing:border-box}body{margin:0;background:var(--i);color:var(--ink);font:16px/1.65 Inter,system-ui,sans-serif}.wrap{width:min(560px,92%);margin:5rem auto}h1{font-family:Georgia,serif;color:var(--d);font-size:2.7rem}.error{background:#fff2f0;border:1px solid #d8aaa3;border-radius:12px;padding:.9rem 1rem;color:#7a2f2f;font-weight:700}input{width:100%;padding:1rem;border:1px solid var(--line);border-radius:14px;background:#fff;font:inherit;margin:.5rem 0 1rem}button{background:var(--d);color:#fff;border:0;border-radius:999px;padding:.8rem 1.1rem;font:700 1rem system-ui;cursor:pointer}.muted{color:var(--mut)}</style></head><body><main class="wrap"><h1>Patient tools</h1><p class="error">${esc(message)}</p><form method="post" action="/.netlify/functions/patient-login"><label for="password"><b>Patient access password</b></label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Try again</button></form><p class="muted"><a href="/patient-tools/">Return to patient tools</a></p></main></body></html>`;
}

exports.handler = async (event) => {
  const secret = process.env.PATIENT_TOOLS_PASSWORD || "";
  if (!secret) {
    return { statusCode: 503, headers: {"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}, body: page("Patient access is not configured yet.") };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 302, headers: { Location: "/patient-tools/", "Cache-Control": "no-store" }, body: "" };
  }

  const params = new URLSearchParams(event.body || "");
  const supplied = params.get("password") || "";
  const a = Buffer.from(supplied);
  const b = Buffer.from(secret);
  const ok = a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);

  if (!ok) {
    return { statusCode: 401, headers: {"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Robots-Tag":"noindex, nofollow"}, body: page("That password did not match. Please try again.") };
  }

  const token = crypto.createHmac("sha256", secret).update("body-connection-patient-tools-v1").digest("base64url");
  const cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/patient-tools; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
  return { statusCode: 302, headers: { Location: "/patient-tools/", "Set-Cookie": cookie, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" }, body: "" };
};