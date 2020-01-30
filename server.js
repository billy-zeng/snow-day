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
  DB.User.find({}, (err, foundUsers) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "something went wrong!", err: err });
    }
    res.status(200).json({ foundUsers });
  });
});

app.post("/api/v1/Users", (req, res) => {
  DB.User.create(req.body, (err, createdUser) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "something went wrong!", err: err });
    }
    const resObj = {
      status: 200,
      data: createdUser,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(resObj);
  });
});

//———————————————————————— Server Start —————————————————————————//
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}.`);
});
