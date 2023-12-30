const jwt = require("jsonwebtoken");
function createRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
}

module.exports = createRefreshToken
 