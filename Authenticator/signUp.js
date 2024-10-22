const express = require("express");
const router = express.Router();
const hashPassword = require("./hashPassword");
router.post("*/api/sign/up", async (req, res,next) => {
  try {
    const connection = req.db;
    const { firstName, lastName, password, mail } = req.body;
    const isEmpty = !firstName && !lastName && !password && !mail;
    const passwordIsShort = password.length < 6;
    if (!isEmpty) {
      res.json({ message: "missing credential values" });
      console.log('missing cred values')
    }
    if (!passwordIsShort) {
      res.json({ message: "Ensure password length is six characters long" });
      console.log('message of error length')
    }
    if (passwordIsShort && isEmpty) {
      const hashValue = hashPassword(password);
      const userName = firstName + " " + lastName;
      const insertQuery = `INSERT INTO users (username ,email password) VALUES (?,?,?)`;
      const queryValues = [userName, mail, hashValue];
      connection.query(insertQuery, queryValues, (err, result) => {
        if (err) {
          return console.error("Error executing query");
        }
        console.log("inserted", result);
        next()
      });
    }
  } catch (err) {
    console.log("Operation failed Could not connect to the database");
  } finally {
    if (req.db) {
      req.db.release();
      next()
    }
  }
  
});
module.exports = router