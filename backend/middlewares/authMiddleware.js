const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ message: "Authorization header missing or malformed", success: false });
    }

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Token is not valid", success: false });
      }

      // ✅ Safely assign userId
      req.userId = decoded.id;
      if (!req.body) req.body = {};
      req.body.userId = decoded.id;

      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};
