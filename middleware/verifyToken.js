
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  console.log("inside MiddleWare")
    const token =req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
console.log( req.headers["authorization"])
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.slice(7), process.env.PRIVATE_KEY);
    req.user = decoded;
    console.log("verified token")
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

module.exports = verifyToken;