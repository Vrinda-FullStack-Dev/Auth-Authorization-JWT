require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const nodemailer=require("nodemailer");
const userRouter = require("./src/routers/user.router");
const tokensRouter = require("./src/routers/tokens.router");
const templateRouter = require("./src/routers/template.router");
const dashboardRouter = require("./src/routers/dashboard.router");
const handleError = require("./src/utils/errorHandler");
const passport = require('passport');
require("./src/config/passport");
const app = express();
const port = process.env.PORT || 5000;

// API security
app.use(helmet());

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Pragma"],
}));

// JSON parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Advdb";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.error("MongoDB connection error:", error.message));


app.use(passport.initialize());

// Routers
app.use("/v1/user", userRouter);
app.use("/v1/tokens", tokensRouter);
app.use("/v1/template", templateRouter);
app.use("/v1/dashboard", dashboardRouter);


app.use((req, res, next) => {
  console.warn(`No route matched for: ${req.method} ${req.originalUrl}`);
  next();
});
// 404 handler
app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  handleError(error, res);
});

// Start server
app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});
