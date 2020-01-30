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

//———————————————————————————— Show ————————————————————————————//

router.get("/:id", (req, res) => {
  DB.User.findById(req.params.id)
    .populate("userResorts")
    .exec((err, foundUser) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "something went wrong!", err: err });
      }
      const resObj = {
        status: 200,
        data: foundUser,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(resObj);
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

//————————————————————————————— Update —————————————————————————————//

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await DB.User.findById(req.params.id);
    console.log(updatedUser.userResorts);
    updatedUser.userResorts.push("5e335dfcf2d01e5bb06234be");
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "something went wrong", err: err });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedUser = await DB.User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     const resObj = {
//       status: 200,
//       data: updatedUser,
//       requestedAt: new Date().toLocaleString()
//     };
//     res.status(200).json(resObj);
//   } catch (err) {
//     return res.status(500).json({ message: "something went wrong!", err: err });
//   }
// });

//————————————————————————————— Export —————————————————————————————//

module.exports = router;
