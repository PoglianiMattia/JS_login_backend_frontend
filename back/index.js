var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs");

var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});

apiServer.get("/api/login", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "errore generico" });
    } else {
      var users = JSON.parse(data);
      users.forEach((a) => {
        if (
          a.mail === req.query.mail &&
          a.password === req.query.password
        ) {
          res.status(200).json({ message: "login effettuato" });
        } else res.status(400).json({ message: "login fallito" });
      });
    }
  });
  //res.status(500).json({ message: "errore generico" });
});
