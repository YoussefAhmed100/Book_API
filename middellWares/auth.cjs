const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const fullToken = req.headers.authorization;
    const token = fullToken?.split("")[1];
    if (!token) return res.status(403).send("access Denied");

    let user = jwt.verify(token, "securitkey");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("invalid jsonwebtoken");
  }
};
