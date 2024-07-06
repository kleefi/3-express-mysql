const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
const databse = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

databse.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  databse.query("select * from users", (err, rows) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "getting data",
      data: rows,
    });
  });
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
