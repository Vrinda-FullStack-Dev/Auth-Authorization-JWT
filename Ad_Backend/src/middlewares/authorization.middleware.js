const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");

const userAuthorization = async (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log("Headers:", JSON.stringify(req.headers));

  // Check if Authorization header exists and starts with "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Forbidden: No authorization header or malformed token",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    // Verify JWT token
    const decoded = await verifyAccessJWT(token);

    // Check token presence in Redis (or session store)
    const userId = await getJWT(token);
    if (!userId) {
      return res.status(403).json({
        message: "Forbidden: Token not found in Redis or session expired",
      });
    }

    // Attach user info to request for further middleware/route handlers
    req.userId = userId;   //actual Mongo user ID
    req.user = decoded; //the payload of JWT (like email)


    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    // Cleanup: delete token from Redis on error
    await deleteJWT(token).catch((err) =>
      console.error("Error deleting JWT from Redis:", err)
    );

    if (!res.headersSent) {
      return res.status(403).json({
        message: "Forbidden: Invalid or expired token",
      });
    }
  }
};

module.exports = {
  userAuthorization,
};
