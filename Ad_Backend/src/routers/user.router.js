const express = require("express");
const passport = require("passport");
const {
  insertUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  storeUserRefreshJWT,
  
} = require("../models/user/User.model");

const {
  hashPassword,
  comparePassword,
} = require("../helpers/bcrypt.helper");

const {
  createAccessJWT,
  createRefreshJWT,
} = require("../helpers/jwt.helper");

const { userAuthorization } = require("../middlewares/authorization.middleware");

const {
  setPasswordRestPin,
  getPinByEmailPin,
  deletePin,
} = require("../models/restPin/RestPin.model");

const { emailProcessor } = require("../helpers/email.helper");

const {
  resetPassReqValidation,
  updatePassValidation,
} = require("../middlewares/formValidation.middleware");

const { deleteJWT } = require("../helpers/redis.helper");

const router = express.Router();

router.all("/", (req, res, next) => {
  next();
});

// Get user profile
router.get("/", userAuthorization, async (req, res) => {
  const userProf = await getUserById(req.userId);
  res.json({ user: userProf });
});

// Register new user
router.post("/signup", async (req, res) => {
  const { name, company, address, email, password,role } = req.body;

  try {
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      company,
      address,
      email,
      password: hashedPass,
      role: role || "user",
    };

    const result = await insertUser(newUserObj);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.error(error);
    res.json({ status: "error", message: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submission!" });
  }

  const user = await getUserByEmail(email);
  if (!user?._id) {
    return res.json({ status: "error", message: "Invalid email or password!" });
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.json({ status: "error", message: "Invalid email or password!" });
  }
  const payload = {
  email: user.email,
  id: user._id.toString(),
  name: user.name,
};
const accessJWT = await createAccessJWT(payload);
const refreshJWT = await createRefreshJWT(payload);

  // const accessJWT = await createAccessJWT(user.email, String(user._id));
  // const refreshJWT = await createRefreshJWT(user.email, String(user._id));
  res.json({
    status: "success",
    message: "Login Successfully!",
    accessJWT,
    refreshJWT,
  });
});

// Request password reset
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (user && user._id) {
    const setPin = await setPasswordRestPin(email);

    await emailProcessor({
      email,
      pin: setPin.pin,
      type: "request-new-password",
    });

    return res.json({
      status: "success",
      message:
        "If the email exists in our database, the password reset pin will be sent shortly.",
    });
  }

  res.json({
    status: "success",
    message:
      "If the email exists in our database, the password reset pin will be sent shortly.",
  });
});

// Validate pin and update password
router.patch("/reset-password", updatePassValidation, async (req, res) => {
  const { email, pin, newPassword } = req.body;

  const getPin = await getPinByEmailPin(email, pin);

  if (getPin?._id) {
    const dbDate = new Date(getPin.addedAt);
    const expiresIn = 1;

    const expDate = new Date(dbDate);
    expDate.setDate(expDate.getDate() + expiresIn);

    const today = new Date();

    if (today > expDate) {
      return res.json({ status: "error", message: "Invalid or expired pin" });
    }

    const hashedPass = await hashPassword(newPassword);
    const user = await updatePassword(email, hashedPass);

    if (user._id) {
      await emailProcessor({
        email,
        pin: getPin.pin,
        type: "request-new-password",
      });
      await deletePin(email, pin);

      return res.json({
        status: "success",
        message: "Your password has been updated",
      });
    }
  } else {
    return res.json({ status: "error", message: "Invalid pin" });
  }
});




// Google OAuth login start
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  async (req, res) => {
    try {
      const  user  = req.user; // This comes from `done(null,user)` in passport.js
      const payload = {
        email: user.email,
        id: user._id.toString(),
        name: user.name,
      };

      // Use your existing token logic
      const accessJWT = await createAccessJWT(payload); // stores in Redis
      const refreshJWT = await createRefreshJWT(payload); // stores in MongoDB

      // Respond or redirect
      // res.redirect(`${process.env.FRONTEND_URL}?accessJWT=${accessJWT}&refreshJWT=${refreshJWT}`);

      res.redirect(`${process.env.FRONTEND_URL}google-redirect?accessJWT=${accessJWT}&refreshJWT=${refreshJWT}`);

      
    } catch (err) {
      console.error(err);
      res.redirect(`${process.env.FRONTEND_URL}?error=auth-failed`);
    }
  }
);


// Logout user
router.delete("/logout", userAuthorization, async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Bad request: Missing token" });
  }

  const token = authorization.split(" ")[1];
  const _id = req.userId;

  await deleteJWT(token);

  const result = await storeUserRefreshJWT(_id, "");

  if (result._id) {
    return res.json({ status: "success", message: "Logged out successfully" });
  }

  res.status(500).json({
    status: "error",
    message: "Unable to log you out. Please try again later.",
  });
});

module.exports = router;
