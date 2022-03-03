var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs");
const { stringify } = require("querystring");
require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});

apiServer.get("/api/login", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);

  connection.query(
    'SELECT count(*) AS utenti FROM c153_5BI1.Users WHERE mail = "' +
      req.query.mail +
      '" AND password="' +
      req.query.password +
      '";',
    function (err, results) {
      console.log(results);
      if (results[0].utenti >= 1) {
        res.status(200).json({ message: "login effettuato" });
      } else {
        res.status(400).json({ message: "login failed" });
      }
    }
  );
});

apiServer.get("/api/register", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "errore generico" });
    } else {
      var users = JSON.parse(data);
      users.push({ mail: req.query.mail, password: req.query.password });
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) res.status(400).json({ message: "sign-up failed" });
        else res.status(200).json({ message: "sign-up success" });
      });
    }
  });
});
