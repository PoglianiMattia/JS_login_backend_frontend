var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());

var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});

apiServer.get("/api/login", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  if(req.query.mail==="mattia" && req.query.password==="pogliani"){
    res.status(200).json({"message":"login effettuato"});
  }else{
    res.status(400).json({"message":"login fallito"});
  }
});
