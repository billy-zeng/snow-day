const express = require("express");
const router = express.Router();
const DB = require("../models");

//———————————————————————————— Index ————————————————————————————//
router.get("/", (req, res) => {
  DB.User.find({}, (err, foundUsers) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "something went wrong!", err: err });
    }
    res.status(200).json({ foundUsers });
  });
});

//———————————————————————————— Create ————————————————————————————//
router.post("/", (req, res) => {
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

//—————————————————————————————Export—————————————————————————————//
module.exports = router;
