const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = 3306;
app.use(cors());
app.use(express.json());

//route for getting data from fluid table
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM fluid_data", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//route for adding an email
app.post("/api/create", (req, res) => {
  const email = req.body.email;
  const token = req.body.token;

  db.query(
    "INSERT INTO verify_emails (email, token) VALUES (?,?)",
    [email, token],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//route for verification codes
function generateVerificationCode() {
  return crypto.randomBytes(20).toString("hex");
}

app.post("/generate-verification-code", (req, res) => {
  const verificationCode = generateVerificationCode();
  const email = req.body.email;

  db.query(
    "INSERT INTO verify_emails (emails, token) VALUES (?,?)",
    [email, verificationCode],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
