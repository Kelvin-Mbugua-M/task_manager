const mariadb = require("mariadb");
const dotenv = require('dotenv')
dotenv.config()

const pool = mariadb.createPool({
  host: "localhost",
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  connectionLimit: 5,
});

const connectDatabase = async (req, res, next) => {
  let connection;
  try {
    connection = await pool.getConnection();
    req.db = connection;
    next();
  } catch (err) {
    console.error("DB connection failed", err);
    res.status(500).send("Database connection error");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = connectDatabase;
