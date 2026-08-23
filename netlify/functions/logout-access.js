const { validSession, parseDevices, hash, updateCustomer, cookieHeader } = require("./access-auth");
exports.handler = async event => {
  try {
    const session = await validSession(event);
    if (session) await updateCustomer(session.cid, { bcn_devices: JSON.stringify(parseDevices(session.customer).filter(d => d.h !== hash(session.did))) });
  } catch (error) { console.error(error); }
  return { statusCode: 303, headers: { Location: "/my-tools/", "Set-Cookie": cookieHeader("", 0), "Cache-Control": "no-store" }, body: "" };
};
