const jwt = require("jsonwebtoken");
function createAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
} 
module.exports = createAccessToken
