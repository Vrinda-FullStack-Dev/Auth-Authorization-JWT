const express = require("express");
const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt.helper");
const { getUserByEmail } = require("../models/user/User.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Forbidden: No authorization header or malformed token" });
  }
  const refreshToken = authorization.split(" ")[1];

  try {
    const decoded = await verifyRefreshJWT(refreshToken);
    const userProf = await getUserByEmail(decoded.email);

    if (userProf._id) {
      const dbToken = userProf.refreshJWT.token;
      let tokenExp = new Date(userProf.refreshJWT.addedAt);
      tokenExp.setDate(
        tokenExp.getDate() + parseInt(process.env.JWT_REFRESH_SECRET_EXP_DAY || "30", 10)
      );

      if (dbToken !== refreshToken || tokenExp < new Date()) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const accessJWT = await createAccessJWT(decoded.email, userProf._id.toString());
      return res.json({ status: "success", accessJWT });
    }
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired refresh token" });
  }

  res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
