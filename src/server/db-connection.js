const mysql = require("mysql");
require("dotenv").config();

// Establish the database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");

  // Perform your query here
  const query = "SELECT fluid_name FROM fluid_data";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Retrieved data:", rows);
    // Process data or perform actions here

    // Close the connection after querying
    connection.end();
  });
});
