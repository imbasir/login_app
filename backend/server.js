const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "signup",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ? ";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});

//Check backend if working
/* 
app.get("/", function (req, res) {
  let sql = "SELECT * FROM login";
  db.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});
 */
app.listen(3000, () => {
  console.log("listening on port: 3000");
  db.connect(function (err) {
    if (err) throw err;
    console.log("Database connected!");
  });
});
