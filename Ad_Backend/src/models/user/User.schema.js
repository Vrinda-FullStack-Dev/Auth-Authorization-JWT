// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const UserSchema = new Schema({
//   name: {
//     type: String,
//     maxlength: 50,
//     required: true,
//   },
//   email: {
//     type: String,
//     maxlength: 50,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     minlength: 8,
//     maxlength: 100,
//     required: false,
//   },
//   role: {
//     type: String,
//     enum: ["admin", "user"],
//     required: true,
//     default: "user",
//   },
//   company: {
//     type: String,
//     maxlength: 100,
//     required: false,
//     required: function() {
//       return this.role === "user";
//     }, // company is required only if role is 'user'
//   },
//   address: {
//     type: String,
//     maxlength: 200,
//     required: false,
//     required: function() {
//       return this.role === "user";
//     }, 
//   },


//   refreshJWT: {
//     token: {
//       type: String,
//       maxlength: 500,
//       default: "",
//     },
//     addedAt: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },
//   },
//   isVerified: {
//     type: Boolean,
//     required: true,
//     default: false,
//   }
// });

// const UserModel = mongoose.model("User", UserSchema);

// module.exports = { UserModel };


const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: function () {
      return this.provider === "local"; // Only required for traditional signups
    },
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
  company: {
    type: String,
    maxlength: 100,
    required: function () {
      return this.provider === "local";
    },
  },
  address: {
    type: String,
    maxlength: 200,
    required: function () {
      return this.provider === "local";
    },
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };

