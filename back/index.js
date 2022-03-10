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
    'SELECT count(*) AS utenti FROM c153_5AITPS.Utenti WHERE mail = "' +
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
  connection.query(
    'INSERT INTO c153_5AITPS.Utenti (mail, password) VALUES (?, ?);',
    [req.query.mail, req.query.password],
    function (err, results) {
      console.log(err, results);
      if (results) {
        res.status(200).json({ message: "sign-up success" });
      } else {
        res.status(400).json({ message: "sign-up failed" });
      }
    }
  );
});
