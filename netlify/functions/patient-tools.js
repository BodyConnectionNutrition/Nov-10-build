const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const COOKIE_NAME = "bcn_patient_tools";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function headers(extra = {}) {
  return {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "private, no-store, max-age=0",
    "X-Robots-Tag": "noindex, nofollow",
    ...extra
  };
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[ch]));
}

function secret() {
  return process.env.PATIENT_TOOLS_PASSWORD || "";
}

function expectedCookie() {
  const key = secret();
  if (!key) return "";
  return crypto.createHmac("sha256", key).update("body-connection-patient-tools-v1").digest("base64url");
}

function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map(part => part.trim()).filter(Boolean).map(part => {
    const i = part.indexOf("=");
    return i === -1 ? [part, ""] : [part.slice(0, i), decodeURIComponent(part.slice(i + 1))];
  }));
}

function authenticated(event) {
  const expected = expectedCookie();
  if (!expected) return false;
  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie || "");
  const actual = cookies[COOKIE_NAME] || "";
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
}

function shell(content, title = "Patient Tools") {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Body Connection Nutrition</title><style>
  :root{--m:#566b4f;--d:#31412f;--c:#c89468;--i:#fbf7ef;--ink:#2e2b27;--mut:#6f665d;--line:rgba(46,43,39,.14)}*{box-sizing:border-box}body{margin:0;background:var(--i);color:var(--ink);font:16px/1.65 Inter,system-ui,sans-serif}h1,h2,h3{font-family:Georgia,serif;color:var(--d);line-height:1.12}h1{font-size:clamp(2.5rem,7vw,4.8rem)}h2{font-size:clamp(1.8rem,4vw,2.7rem)}a{color:var(--d)}.head{border-bottom:1px solid var(--line);background:#fbf7eff4}.headin,.wrap{width:min(980px,92%);margin:auto}.headin{height:68px;display:flex;align-items:center;justify-content:space-between}.head a{text-decoration:none;font-weight:800}.wrap{padding:4rem 0}.eye{color:var(--c);font-weight:800;text-transform:uppercase;letter-spacing:.14em;font-size:.76rem}.lead{font-size:1.2rem;color:var(--mut);max-width:760px}.note,.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:1.4rem}.note{border-left:4px solid var(--c);margin:1.5rem 0}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:2rem 0}.card h3{margin:.2rem 0 .55rem}.meta{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--c)}.button,button{display:inline-block;background:var(--d);color:#fff;border:1px solid var(--d);border-radius:999px;padding:.78rem 1.05rem;font-weight:800;text-decoration:none;cursor:pointer}input{width:100%;padding:1rem;border:1px solid var(--line);border-radius:14px;background:#fff;font:inherit;margin:.5rem 0 1rem}.login{max-width:560px}.error{color:#7a2f2f;font-weight:700}.fine{font-size:.9rem;color:var(--mut)}@media(max-width:700px){.grid{grid-template-columns:1fr}}</style></head><body><header class="head"><div class="headin"><a href="/">Body Connection Nutrition</a><a href="/">Main site</a></div></header><main class="wrap">${content}</main></body></html>`;
}

function loginPage(error = "") {
  return shell(`<div class="login"><p class="eye">Patient access</p><h1>Tools shared with you</h1><p class="lead">Enter the patient access password provided to you by Body Connection Nutrition.</p>${error ? `<p class="error">${escapeHtml(error)}</p>` : ""}<form method="post" action="/patient-tools/login"><label for="password"><b>Patient access password</b></label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Enter patient tools →</button></form><div class="note"><b>Your responses to these educational tools are not automatically sent to your clinician.</b> Unless a tool explicitly says otherwise, your work remains in your browser.</div><p class="fine">This area is intended for current patients who have been given access directly.</p></div>`, "Patient Tools");
}

function hubPage() {
  return shell(`<p class="eye">Patient learning space</p><h1>Body Connection tools</h1><p class="lead">These tools are available to you as part of your work with Body Connection Nutrition. They are designed to help you notice patterns, examine influences, and develop a more complete understanding of food and body experiences.</p><div class="note"><b>You do not need to complete these in order.</b> Use the tool that connects most directly to what you are working on. You can also bring anything you notice into a future appointment.</div><div class="grid">
  <article class="card"><p class="meta">Notice body signals</p><h3>Can You Hear Your Body?</h3><p>Explore signal, interpretation, and permission—the space between what your body communicates and what happens next.</p><a class="button" href="/tools/can-you-hear-your-body/">Open tool →</a></article>
  <article class="card"><p class="meta">Examine an eating moment</p><h3>Why Am I Eating?</h3><p>Take one real food decision apart and explore the biological, learned, emotional, relational, and environmental forces shaping it.</p><a class="button" href="/patient-tools/why-am-i-eating">Open tool →</a></article>
  <article class="card"><p class="meta">Map food influences</p><h3>Who Taught You to Eat?</h3><p>Build a picture of the people, environments, systems, and experiences that have shaped how you eat across your life.</p><a class="button" href="/tools/who-taught-you-to-eat/">Open tool →</a></article>
  <article class="card"><p class="meta">Map body-image influences</p><h3>How Was My Body Image Created?</h3><p>Trace the family, peer, cultural, media, healthcare, and lived-body influences that contributed to body image.</p><a class="button" href="/tools/how-was-my-body-image-created/">Open tool →</a></article>
  <article class="card"><p class="meta">Examine one idea</p><h3>Deconstructing a Belief</h3><p>Take one food or body belief apart and trace how it became familiar, convincing, and influential.</p><a class="button" href="/tools/deconstructing-a-belief/">Open tool →</a></article>
</div><p><a href="/patient-tools/logout">Sign out of patient tools</a></p>`, "Patient Tools");
}

function redirect(location, extraHeaders = {}) {
  return { statusCode: 302, headers: { Location: location, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", ...extraHeaders }, body: "" };
}

exports.handler = async (event) => {
  const configured = Boolean(secret());
  if (!configured) {
    return { statusCode: 503, headers: headers(), body: shell(`<h1>Patient tools are not configured yet</h1><p>The patient access password still needs to be added to the site's secure environment settings.</p>`, "Patient Tools") };
  }

  const route = (event.queryStringParameters && event.queryStringParameters.path || "").replace(/^\/+|\/+$/g, "");

  if (route === "login" && event.httpMethod === "POST") {
    const params = new URLSearchParams(event.body || "");
    const supplied = params.get("password") || "";
    const a = Buffer.from(supplied);
    const b = Buffer.from(secret());
    const ok = a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
    if (!ok) return { statusCode: 401, headers: headers(), body: loginPage("That password did not match. Please try again.") };
    const cookie = `${COOKIE_NAME}=${encodeURIComponent(expectedCookie())}; Path=/patient-tools; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
    return redirect("/patient-tools/", { "Set-Cookie": cookie });
  }

  if (route === "logout") {
    return redirect("/patient-tools/", { "Set-Cookie": `${COOKIE_NAME}=; Path=/patient-tools; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
  }

  if (!authenticated(event)) {
    return { statusCode: 200, headers: headers(), body: loginPage() };
  }

  if (!route) return { statusCode: 200, headers: headers(), body: hubPage() };

  if (route === "why-am-i-eating") {
    try {
      const toolPath = path.join(__dirname, "private", "why-am-i-eating.html");
      let html = fs.readFileSync(toolPath, "utf8");
      html = html.replace("</body>", `<div style="position:fixed;right:18px;bottom:18px;z-index:9999"><a href="/patient-tools/" style="display:inline-block;background:#31412f;color:white;text-decoration:none;font:700 14px/1.2 system-ui;padding:10px 14px;border-radius:999px;box-shadow:0 4px 16px #0002">← Patient tools</a></div></body>`);
      return { statusCode: 200, headers: headers(), body: html };
    } catch (error) {
      console.error(error);
      return { statusCode: 500, headers: headers(), body: shell(`<h1>Tool unavailable</h1><p>Why Am I Eating? could not be loaded. Please try again shortly.</p><p><a href="/patient-tools/">Return to patient tools</a></p>`, "Tool unavailable") };
    }
  }

  return { statusCode: 404, headers: headers(), body: shell(`<h1>Tool not found</h1><p><a href="/patient-tools/">Return to patient tools</a></p>`, "Not found") };
};
