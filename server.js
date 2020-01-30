//———————————————————————— Server Config ————————————————————————//
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

const app = express();
const path = require("path");
const DB = require("./models");

//————————————————————————— Middleware ——————————————————————————//
app.use(bodyParser.json());

//————————————————————————— API Routes ——————————————————————————//

app.get("/api/v1/Users", (req, res) => {
  DB.User.find({}, (err, response) => {
    if (err) {
      return response
        .status(400)
        .json({ message: "something went wrong!", err: err });
    }
    response.status(200).json({ foundUsers });
  });
});

//———————————————————————— Server Start —————————————————————————//
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}.`);
});
