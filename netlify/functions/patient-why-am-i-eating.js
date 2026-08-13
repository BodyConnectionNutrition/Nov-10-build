const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const COOKIE_NAME = "bcn_patient_tools";

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

function redirect(location) {
  return { statusCode: 302, headers: { Location: location, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" }, body: "" };
}

exports.handler = async (event) => {
  if (!secret()) return redirect("/patient-tools/");
  if (!authenticated(event)) return redirect("/patient-tools/");

  try {
    const toolPath = path.join(__dirname, "private", "why-am-i-eating.html");
    let html = fs.readFileSync(toolPath, "utf8");
    html = html.replace("</body>", `<div style="position:fixed;right:18px;bottom:18px;z-index:9999"><a href="/patient-tools/" style="display:inline-block;background:#31412f;color:white;text-decoration:none;font:700 14px/1.2 system-ui;padding:10px 14px;border-radius:999px;box-shadow:0 4px 16px #0002">← Patient tools</a></div></body>`);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow"
      },
      body: html
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
      body: "<h1>Tool unavailable</h1><p>Why Am I Eating? could not be loaded. Please return to <a href='/patient-tools/'>patient tools</a> and try again.</p>"
    };
  }
};