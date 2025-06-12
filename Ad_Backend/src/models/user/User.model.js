const { UserModel } = require("./User.schema");

// Insert a new user
const insertUser = async (userObj) => {
  try {
    const result = await new UserModel(userObj).save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  if (!email) throw new Error("Email is missing");
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

// Get user by ID
const getUserById = async (_id) => {
  if (!_id) throw new Error("ID is missing");
  try {
    const user = await UserModel.findById(_id); // you can also use findOne({ _id })
    return user;
  } catch (error) {
    throw error;
  }
};

// Store Refresh JWT
const storeUserRefreshJWT = async (_id, token) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          "refreshJWT.token": token,
          "refreshJWT.addedAt": Date.now(),
        },
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Update user password
const updatePassword = async (email, newhashedPass) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        $set: { password: newhashedPass },
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Verify user
const verifyUser = async (_id, email) => {
  try {
    const verifiedUser = await UserModel.findOneAndUpdate(
      { _id, email, isVerified: false },
      {
        $set: { isVerified: true },
      },
      { new: true }
    );
    return verifiedUser;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  insertUser,
  getUserByEmail,
  getUserById,
  storeUserRefreshJWT,
  updatePassword,
  verifyUser,
  
};
