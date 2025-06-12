
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');
// const jwt = require('jsonwebtoken');

// // 👇 Use your service methods here
// const { getUserByEmail, insertUser } = require('../models/user/User.model');

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if user already exists
//         const email = profile.emails[0].value;
//         let user = await getUserByEmail(email);

//         // If not, create the user (password is empty for Google users)
//         if (!user) {
//           const userObj = {
//             name: profile.displayName,
//             email: email,
//             provider: "google",
//             role: 'user',
//             isVerified: true,  
//           };
          
//         if (!isGoogleUser) {
//             userObj.password = hashedPassword;
//             userObj.company = req.body.company;
//             userObj.address = req.body.address;
//           }
//           user = await insertUser(userObj);
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//           { id: user._id.toString(), name: user.name, email: user.email },
//           process.env.JWT_SECRET,
//           { expiresIn: '7d' }
//         );

//         // Pass the user and token to the next middleware
//         done(null, user);
//       } catch (err) {
//         console.error("Google login error:", err);
//         done(err, null);
//       }
//     }
//   )
// );


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUserByEmail, insertUser } = require('../models/user/User.model');
const { createAccessJWT, createRefreshJWT } = require('../helpers/jwt.helper');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await getUserByEmail(email);

        if (!user) {
          // If user doesn't exist, create a new one
          const userObj = {
            name: profile.displayName,
            email,
            password: "temporary_google_pass", // Avoid empty string to satisfy Mongoose minLength
            role: "user",
            company: "Google User",
            address: "OAuth - N/A",
            isVerified: true,
          };

          user = await insertUser(userObj);
        }

        return done(null, user);
      } catch (error) {
        console.error("Google login error:", error);
        return done(error, false);
      }
    }
  )
);
