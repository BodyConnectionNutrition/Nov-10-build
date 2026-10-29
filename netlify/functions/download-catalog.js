const fs = require("fs");
const path = require("path");
const { validSession } = require("./access-auth");

exports.handler = async event => {
  try {
    const session = await validSession(event);
    if (!session || !session.grants.includes("food-body-bias-catalog")) return { statusCode: 303, headers: { Location: "/my-tools/", "Cache-Control": "no-store" }, body: "" };
    const format = ((event.queryStringParameters || {}).format || "pdf").toLowerCase();
    const files = {
      pdf: { name: "Food_and_Body_Bias_Catalog.pdf", type: "application/pdf" },
      docx: { name: "Food_and_Body_Bias_Catalog.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    };
    const selected = files[format];
    if (!selected) return { statusCode: 400, body: "Unsupported format." };
    const content = fs.readFileSync(path.join(__dirname, "private", selected.name));
    return { statusCode: 200, isBase64Encoded: true, headers: { "Content-Type": selected.type, "Content-Disposition": 'attachment; filename="'+selected.name+'"', "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow" }, body: content.toString("base64") };
  } catch (error) { console.error(error); return { statusCode: 500, body: "We could not prepare the download. Please try again shortly or visit Purchase Help." }; }
};
