const express = require("express");
const router = express.Router();
const DB = require("../models");

//———————————————————————————— Index ————————————————————————————//

router.get("/", (req, res) => {
  DB.Resort.find({}, (err, foundResorts) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "something went wrong", err: err });
    }
    res.status(200).json({ foundResorts });
  });
});

//———————————————————————————— Create ————————————————————————————//

router.post("/", (req, res) => {
  DB.Resort.create(req.body, (err, createdResort) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "something went wrong!", err: err });
    }
    const resObj = {
      status: 200,
      data: createdResort,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(resObj);
  });
});

//—————————————————————————————Export—————————————————————————————//

module.exports = router;
