// redis.helper.js (CommonJS)
const redis = require("redis");

// Create and connect the Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

client.on("error", (err) => console.error("Error connecting to Redis:", err));
client.on("connect", () => console.log("Redis client connected successfully"));

// Immediately connect
(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

// Helper to set a JWT in Redis
const setJWT = async (key, value) => {
  console.log("Setting JWT - Key:", key, "Value:", value);
  if (typeof key !== "string" || typeof value !== "string") {
    throw new TypeError("Invalid argument type: key and value must be strings.");
  }
  try {
    const result = await client.set(key, value, { EX: 3600 }); // 1 hour
    console.log("Set JWT result:", result);
    return result;
  } catch (error) {
    console.error("Error setting JWT in Redis:", error);
    throw error;
  }
};

// Helper to get a JWT from Redis
const getJWT = async (key) => {
  console.log("Getting JWT - Key:", key);
  try {
    const result = await client.get(key);
    console.log("Get JWT result:", result);
    return result;
  } catch (error) {
    console.error("Error getting JWT from Redis:", error);
    throw error;
  }
};

// Helper to delete a JWT from Redis
const deleteJWT = async (key) => {
  console.log("Deleting JWT - Key:", key);
  try {
    const result = await client.del(key);
    console.log("Delete JWT result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting JWT from Redis:", error);
    throw error;
  }
};

module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
