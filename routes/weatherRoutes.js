const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

// routes start at localhost:4000/api/v1/weather

//————————————————————————————— Grab snow data from Aeris weather API —————————————————————————————//

router.get("/snowdepth/:lat/:lng", (req, res) => {
  try {
    fetch(`https://api.aerisapi.com/winter/snowdepth/${req.params.lat},${req.params.lng}?client_id=Zc6ukuD2NZWLcVQhjTnKx&client_secret=WtzA8Yipil9TNFiwtuvck2TTu1NeLUTZwAs8GsCG`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((snowdepthDataStream) => snowdepthDataStream.json())
    .then((snowdepthDataObj) => {
      res.status(200).json(snowdepthDataObj);
    })
    .catch((err) => console.log(err));;
  } catch (err) {
    return res.status(400).json({ message: "something went wrong!", err: err });
  }
});

//————————————————————————————— Grab temperature data from Aeris weather API —————————————————————————————//

router.get("/temperature/:lat/:lng", (req, res) => {
  try {
    fetch(`https://api.aerisapi.com/forecasts/${req.params.lat},${req.params.lng}?format=json&filter=day&limit=7&client_id=Zc6ukuD2NZWLcVQhjTnKx&client_secret=WtzA8Yipil9TNFiwtuvck2TTu1NeLUTZwAs8GsCG`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((temperatureDataStream) => temperatureDataStream.json())
    .then((temperatureDataObj) => {
      res.status(200).json(temperatureDataObj);
    })
    .catch((err) => console.log(err));;
  } catch (err) {
    return res.status(400).json({ message: "something went wrong!", err: err });
  }
});

//————————————————————————————— Export Module —————————————————————————————//
module.exports = router;