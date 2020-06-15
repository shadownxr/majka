const express = require("express");
const bodyParser = require("body-parser");
var accountRouter = require('./routes/account-routes');
var cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/',accountRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World." });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
