const express = require("express");
const router = express.Router();
const DB = require("../models");

// routes start at localhost:4000/api/v1/resorts

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

//————————————————————————————— Show —————————————————————————————//

router.get("/:id", async (req, res) => {
  try {
    const foundResort = await DB.Resort.findById(req.params.id);
    const resObj = {
      status: 200,
      data: foundResort,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(resObj);
  } catch (err) {
    return res.status(400).json({ message: "something went wrong!", err: err });
  }
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

//————————————————————————————— Update —————————————————————————————//

router.post("/:id/reviews", async (req, res) => {
  try {
    const foundResort = await DB.Resort.findById(req.params.id);
    foundResort.reviews.push(req.body);
    foundResort.save();
    const resObj = {
      status: 200,
      data: foundResort,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(resObj);
  } catch (err) {
    return res.status(500).json({ message: "something went wrong", err: err });
  }
});

//————————————————————————————— Export Module —————————————————————————————//
module.exports = router;
