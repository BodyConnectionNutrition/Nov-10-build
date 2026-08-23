const fs = require("fs");
const path = require("path");
const { TOOLS, validSession } = require("./access-auth");

function html(statusCode, body) { return { statusCode, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow" }, body }; }
exports.handler = async event => {
  const product = (event.queryStringParameters || {}).product || "", tool = TOOLS[product];
  if (!tool) return html(404, "<h1>Tool not found</h1>");
  try {
    const session = await validSession(event);
    if (!session || !session.grants.includes(product)) return { statusCode: 303, headers: { Location: "/my-tools/", "Cache-Control": "no-store" }, body: "" };
    let content = fs.readFileSync(path.join(__dirname, "private", tool.file), "utf8");
    content = content.replace("</body>", `<div class="product-return"><a href="/my-tools/">← Return to My Tools</a></div></body>`);
    return html(200, content);
  } catch (error) { console.error(error); return html(500, "<h1>We could not verify access</h1><p>Please try again shortly or visit <a href='/purchase-support/'>Purchase Help</a>.</p>"); }
};
