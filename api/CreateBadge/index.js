const { createCanvas, loadImage } = require("canvas");
const { rename } = require("fs");
const querystring = require("querystring");

const templateWH = [394, 225];
const profilePictureStart = [22, 48];
const profilePictureWH = [97, 121];
const letterStart = [250, 205];

const multipart = require("parse-multipart");

badgeTemplateUrl = "https://i.imgur.com/HjluofW.png";

const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: "{yourOktaIssuer}",
});

const getAuthToken = (req) => {
  const header = req.headers["okta-authorization"];
  const tokenParts = header.split(" ");
  const token = tokenParts.length > 0 ? tokenParts[1] : "";

  return token;
};

const drawImage = async (req, jwt) => {
  const canvas = createCanvas(templateWH[0], templateWH[1]);
  const ctx = canvas.getContext("2d");
  const firstLetter = jwt.claims["name"][0];

  const template = await loadImage(badgeTemplateUrl);
  ctx.drawImage(template, 0, 0, templateWH[0], templateWH[1]);

  ctx.font = "68px Calibri";
  ctx.fillStyle = "#fff";
  ctx.fillText(firstLetter, letterStart[0], letterStart[1]);

  const bodyBuffer = Buffer.from(req.body);
  const boundary = multipart.getBoundary(req.headers["content-type"]);
  const parts = multipart.Parse(bodyBuffer, boundary);

  const profileImage = await loadImage(parts[0].data);
  ctx.drawImage(
    profileImage,
    profilePictureStart[0],
    profilePictureStart[1],
    profilePictureWH[0],
    profilePictureWH[1]
  );

  return canvas;
};

const getNonce = (req) => {
  const cookieParts = req.headers["cookie"].split(";");

  for (let i = 0; i < cookieParts.length; i++) {
    const p = cookieParts[i].split("=");

    if (p[0].trim() === "okta-oauth-nonce") return p[1];
  }
};

module.exports = async function (context, req) {
  const idTokenString = getAuthToken(req);
  const expectedClientId = "{yourClientId}";
  const expectedNonce = getNonce(req);
  let jwt;

  try {
    jwt = await oktaJwtVerifier.verifyIdToken(
      idTokenString,
      expectedClientId,
      expectedNonce
    );
  } catch (error) {
    context.res = {
      status: 403,
    };
    context.done();
  }

  const canvas = await drawImage(req, jwt);

  var stream = await canvas.pngStream();
  context.res.setHeader("Content-Type", "image/png");
  context.res.end(canvas.toBuffer("image/png"));
};
