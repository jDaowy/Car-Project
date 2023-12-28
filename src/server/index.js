const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

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
      } else {
        sendVerificationEmail(email, verificationCode); // Send email
        console.log(result);
        res.send("Verification code sent to email");
      }
    }
  );
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "hotmail", // e.g., 'gmail', 'outlook', etc.
  auth: {
    user: "jdscarproject@hotmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send verification email
function sendVerificationEmail(email, verificationCode) {
  const confirmationLink = `http://localhost:3306/confirm/${verificationCode}`;

  const mailOptions = {
    from: "jdscarproject@hotmail.com",
    to: email,
    subject: "Email Confirmation",
    html: `<p>Please click <a href="${confirmationLink}">here</a> to confirm your email.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// Route to handle email confirmation link
app.get("/confirm/:token", (req, res) => {
  const token = req.params.token;

  db.query(
    "SELECT emails FROM verify_emails WHERE token = ?",
    [token],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error confirming email");
      } else {
        if (result.length > 0) {
          const email = result[0].emails;

          // Email and token are correct, perform necessary actions
          db.query(
            "DELETE FROM verify_emails WHERE token = ?",
            [token],
            (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.log(deleteErr);
                res.send("Error confirming email");
              } else {
                console.log(deleteResult);
                res.send(
                  `Email ${email} confirmed and entry removed from table`
                );
              }
            }
          );
          createConfirmedEmail(email);
        }
      }
    }
  );
});

function createConfirmedEmail(email) {
  const confirmationDate = new Date(); // Get current date and time
  db.query(
    "INSERT INTO confirmed_emails (email, brake_last, coolant_last, oil_last, steering_last, transmission_last) VALUES (?, ?, ?, ?, ?, ?)",
    [
      email,
      confirmationDate,
      confirmationDate,
      confirmationDate,
      confirmationDate,
      confirmationDate,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
}

cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
  checkBrakeFluid();
});

function checkBrakeFluid() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const formattedDate = sixMonthsAgo.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
  console.log(formattedDate);

  // Query to find records where brake_last is exactly 6 months ago
  const query = `SELECT email, brake_last FROM confirmed_emails WHERE brake_last = '${formattedDate}'`;

  db.query(query, (err, result) => {
    if (result.length > 0) {
      // Perform actions for records with brake_last 6 months ago
      console.log(
        "Records found with brake_last exactly 6 months ago:",
        result
      );
      // Perform your desired actions here
      // For example: Send notifications or perform specific tasks
    } else {
      console.log("No records found with brake_last exactly 6 months ago.");
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
