const mysql = require("mysql");
const db = require("./db");

db.connect((err, connection) => {
  if (err) {
    // Handle the error.
    console.log("error", err);
  } else {
    // The connection is successful.
    // Use the connection object to perform operations on the MySQL database.
    console.log("connected");
  }
});
