const bcrypt = require("bcryptjs");

const compareHash = async (value, storedValue) => {
  try {
    const match = await bcrypt.compare(value, storedValue);
    return match;
  } catch (err) {
    console.error(`error in comparing the value ${value} and ${storedValue}  `);
  }
};
module.exports = compareHash