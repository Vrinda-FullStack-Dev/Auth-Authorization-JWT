// bcrypt.helper.js

const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, saltRounds);
};

const comparePassword = (plainPass, passFromDb) => {
  return bcrypt.compare(plainPass, passFromDb);
};

module.exports = {
  hashPassword,
  comparePassword,
};
