const dotenv = require("dotenv");
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const router = express.Router();
const connectDatabase = require("./database/connectDatabase");
const signUp = require("./Authenticator/signUp");
dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.options("*", cors());

app.use(express.json());
app.use(connectDatabase);
router.use(signUp);
app.get("/*", (req, res, next) => {
  res.send({ sent: "yeah all sent" });
  console.log(req.body);
  next();
});
app.post("/api", (req, res, next) => {
  console.log(req.body);
  next();
});
app.post("*/api/sign/up", (req, res) => {
  res.json({ message: "successful", data: req.body });
  console.log(req.body);
});
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
