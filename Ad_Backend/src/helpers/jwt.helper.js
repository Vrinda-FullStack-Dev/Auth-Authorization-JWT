// jwt.helper.js

const jwt = require("jsonwebtoken");
const { setJWT, getJWT, deleteJWT } = require("../helpers/redis.helper");
const { storeUserRefreshJWT } = require("../models/user/User.model");

// Ensure JWT secrets are defined
if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets are not defined in environment variables");
}

// Create Access JWT
// const createAccessJWT = async (email, _id) => {
//   if (!email || !_id) {
//     return Promise.reject(new Error("Missing required parameters: 'email' or '_id'"));
//   }

//   try {
//     const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
//       expiresIn: "1d",
//     });

//     console.log("Storing Access JWT in Redis - Key:", accessJWT, "Value:", String(_id));
//     await setJWT(accessJWT, String(_id));

//     return accessJWT;
//   } catch (error) {
//     console.error("Error creating Access JWT:", error.message);
//     throw error;
//   }
// };


const createAccessJWT = async (payload) => {
  if (!payload || !payload.email || !payload.id) {
    return Promise.reject(new Error("Missing required fields in payload"));
  }

  try {
    // Sign the entire payload (email, id, name, etc)
    const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });

    console.log("Storing Access JWT in Redis - Key:", accessJWT, "Value:", String(payload.id));
    await setJWT(accessJWT, String(payload.id));

    return accessJWT;
  } catch (error) {
    console.error("Error creating Access JWT:", error.message);
    throw error;
  }
};


// Create Refresh JWT
// const createRefreshJWT = async (email, _id) => {
//   if (!email || !_id) {
//     return Promise.reject(new Error("Missing required parameters: 'email' or '_id'"));
//   }

//   try {
//     const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
//       expiresIn: "30d",
//     });

//     console.log("Storing Refresh JWT in Database for User ID:", _id);
//     await storeUserRefreshJWT(_id, refreshJWT);

//     return refreshJWT;
//   } catch (error) {
//     console.error("Error creating Refresh JWT:", error.message);
//     throw error;
//   }
// };

const createRefreshJWT = async (payload) => {
  if (!payload || !payload.email || !payload.id) {
    return Promise.reject(new Error("Missing required fields in payload"));
  }

  try {
    const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    console.log("Storing Refresh JWT in Database for User ID:", payload.id);
    await storeUserRefreshJWT(payload.id, refreshJWT);

    return refreshJWT;
  } catch (error) {
    console.error("Error creating Refresh JWT:", error.message);
    throw error;
  }
};


// Verify Access JWT
const verifyAccessJWT = (token) => {
  if (!token) {
    console.error("Access JWT is null or undefined");
    return Promise.reject(new Error("Access JWT is missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log("Access JWT verified successfully:", decoded);
    return Promise.resolve(decoded);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Access JWT expired:", error.message);
      return Promise.reject(new Error("Access token has expired"));
    }
    console.error("Access JWT Verification Error:", error.message);
    return Promise.reject(error);
  }
};

// Verify Refresh JWT
const verifyRefreshJWT = (token) => {
  if (!token) {
    console.error("Refresh JWT is null or undefined");
    return Promise.reject(new Error("Refresh JWT is missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    console.log("Refresh JWT verified successfully:", decoded);
    return Promise.resolve(decoded);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Refresh JWT expired:", error.message);
      return Promise.reject(new Error("Refresh token has expired"));
    }
    console.error("Refresh JWT Verification Error:", error.message);
    return Promise.reject(error);
  }
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
};
