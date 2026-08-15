const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const COOKIE_NAME = "bcn_patient_tools";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const FILES = {
  "why-am-i-eating": "why-am-i-eating.html",
  "who-taught-you-to-eat": "who-taught-you-to-eat.html",
  "how-was-my-body-image-created": "how-was-my-body-image-created.html",
  "deconstructing-a-belief": "deconstructing-a-belief.html",
  "behavior-sequence": "behavior-sequence.html",
  "permission-and-scarcity": "permission-and-scarcity.html",
  "what-is-this-doing-for-me": "what-is-this-doing-for-me.html",
  "choice-has-conditions": "choice-has-conditions.html",
  "my-food-and-body-framework": "my-food-and-body-framework.html"
};

function headers(extra = {}) { return { "Content-Type":"text/html; charset=utf-8", "Cache-Control":"private, no-store, max-age=0", "X-Robots-Tag":"noindex, nofollow", ...extra }; }
function escapeHtml(value = "") { return String(value).replace(/[&<>'\"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch])); }
function secret(){ return process.env.PATIENT_TOOLS_PASSWORD || ""; }
function expectedCookie(){ const key=secret(); return key ? crypto.createHmac("sha256",key).update("body-connection-patient-tools-v1").digest("base64url") : ""; }
function parseCookies(header=""){ return Object.fromEntries(header.split(";").map(x=>x.trim()).filter(Boolean).map(part=>{const i=part.indexOf("=");return i===-1?[part,""]:[part.slice(0,i),decodeURIComponent(part.slice(i+1))];})); }
function authenticated(event){ const expected=expectedCookie(); if(!expected)return false; const cookies=parseCookies(event.headers.cookie||event.headers.Cookie||""); const actual=cookies[COOKIE_NAME]||""; const a=Buffer.from(actual),b=Buffer.from(expected); return a.length===b.length&&a.length>0&&crypto.timingSafeEqual(a,b); }
function shell(content,title="Patient Tools"){ return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Body Connection Nutrition</title><style>:root{--m:#566b4f;--d:#31412f;--c:#c89468;--i:#fbf7ef;--ink:#2e2b27;--mut:#6f665d;--line:rgba(46,43,39,.14)}*{box-sizing:border-box}body{margin:0;background:var(--i);color:var(--ink);font:16px/1.65 Inter,system-ui,sans-serif}h1,h2,h3{font-family:Georgia,serif;color:var(--d)}.wrap{width:min(900px,92%);margin:auto;padding:4rem 0}.error{color:#7a2f2f;font-weight:700}input{width:100%;padding:1rem;border:1px solid var(--line);border-radius:14px;background:#fff;font:inherit;margin:.5rem 0 1rem}button{background:var(--d);color:#fff;border:0;border-radius:999px;padding:.8rem 1.1rem;font-weight:700}</style></head><body><main class="wrap">${content}</main></body></html>`; }
function loginPage(error=""){ return shell(`<p>Patient access</p><h1>Tools shared with you</h1><p>Enter the patient access password provided to you by Body Connection Nutrition.</p>${error?`<p class="error">${escapeHtml(error)}</p>`:""}<form method="post" action="/patient-tools/login"><label for="password"><b>Patient access password</b></label><input id="password" name="password" type="password" required><button type="submit">Enter patient tools →</button></form>`,"Patient Tools"); }
function redirect(location,extraHeaders={}){ return {statusCode:302,headers:{Location:location,"Cache-Control":"no-store",...extraHeaders},body:""}; }
exports.handler=async(event)=>{
 if(!secret())return{statusCode:503,headers:headers(),body:shell("<h1>Patient tools are not configured yet</h1>")};
 const route=((event.queryStringParameters&&event.queryStringParameters.path)||"").replace(/^\/+|\/+$/g,"");
 if(route==="login"&&event.httpMethod==="POST"){const params=new URLSearchParams(event.body||"");const supplied=params.get("password")||"";const a=Buffer.from(supplied),b=Buffer.from(secret());const ok=a.length===b.length&&a.length>0&&crypto.timingSafeEqual(a,b);if(!ok)return{statusCode:401,headers:headers(),body:loginPage("That password did not match. Please try again.")};const cookie=`${COOKIE_NAME}=${encodeURIComponent(expectedCookie())}; Path=/patient-tools; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;return redirect("/patient-tools/",{"Set-Cookie":cookie});}
 if(!authenticated(event))return{statusCode:200,headers:headers(),body:loginPage()};
 const file=FILES[route];
 if(file){try{let html=fs.readFileSync(path.join(__dirname,"private",file),"utf8");html=html.replace("</body>",'<div style="position:fixed;right:18px;bottom:18px;z-index:9999"><a href="/patient-tools/" style="display:inline-block;background:#31412f;color:white;text-decoration:none;font:700 14px/1.2 system-ui;padding:10px 14px;border-radius:999px;box-shadow:0 4px 16px #0002">← Patient tools</a></div></body>');return{statusCode:200,headers:headers(),body:html};}catch(error){console.error(error);return{statusCode:500,headers:headers(),body:shell("<h1>Tool unavailable</h1><p>Please try again shortly.</p>")};}}
 return{statusCode:404,headers:headers(),body:shell('<h1>Tool not found</h1><p><a href="/patient-tools/">Return to patient tools</a></p>',"Not found")};
};
