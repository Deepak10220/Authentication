const jwt = require("jsonwebtoken");
const ensureAuththenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Unauthorized,JWT token",
    });
  }
};
module.exports = ensureAuththenticated;
