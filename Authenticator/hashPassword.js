const bcrypt = require("bcryptjs");
const compareHash = async (value) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(value, saltRounds);
    return passwordHash;
  } catch (err) {
    console.log("error hashing the password string");
  }
};
module.exports = compareHash