exports.handler = async event => {
  const host = String((event.headers && (event.headers.host || event.headers.Host)) || "").toLowerCase();
  if (host !== "deploy-preview-13--bodyconnectionnutrition.netlify.app") return { statusCode: 404, body: "Not found" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: { Allow: "POST" }, body: "Method not allowed" };
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
        "Content-Type": "application/json",
        "User-Agent": "body-connection-nutrition/1.0"
      },
      body: JSON.stringify({
        from: process.env.ACCESS_EMAIL_FROM || "Body Connection Nutrition <access@bodyconnectionnutrition.com>",
        to: ["delivered+bcn-access-test@resend.dev"],
        subject: "Body Connection Nutrition email configuration test",
        text: "Synthetic delivery test for the purchaser-access system."
      })
    });
    const data = await response.json();
    if (!response.ok) return { statusCode: 502, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, providerStatus: response.status, providerError: data && (data.name || data.message) }) };
    return { statusCode: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ ok: true, providerAccepted: Boolean(data && data.id) }) };
  } catch (error) {
    return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: "Email test failed before provider acceptance." }) };
  }
};
