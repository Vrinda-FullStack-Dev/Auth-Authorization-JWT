const { ResetPinSchema } = require("./RestPin.schema");
const { randomPinNumber } = require("../../utils/randomGenerator");

// Create and save a new reset pin document
const setPasswordRestPin = async (email) => {
  const pinLength = 6;
  const randPin = await randomPinNumber(pinLength);

  const restObj = {
    email,
    pin: randPin,
  };

  // Directly return the promise from Mongoose save()
  const resetPinDoc = new ResetPinSchema(restObj);
  return resetPinDoc.save();
};

// Find the reset pin document by email and pin using async/await
const getPinByEmailPin = async (email, pin) => {
  try {
    const data = await ResetPinSchema.findOne({ email, pin });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Delete reset pin document by email and pin using async/await
const deletePin = async (email, pin) => {
  try {
    await ResetPinSchema.findOneAndDelete({ email, pin });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  setPasswordRestPin,
  getPinByEmailPin,
  deletePin,
};
