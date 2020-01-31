const express = require("express");
const router = express.Router();
const DB = require("../models");
const bcrypt = require("bcryptjs");

//———————————————————————— Create / Signup ————————————————————————//

router.post("/", async (req, res) => {
  const userData = req.body;
  //let hash;
  // validate form complete
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "All fields are required for signup." });
    }

    // validate unique email

    const foundUser = await DB.User.findOne({ email: req.body.email });
    if (foundUser)
      return res.status(400).json({
        message:
          "This account already exists. Please use a different email address."
      });

    const hash = await bcrypt.hashSync(req.body.password, 10);
    userData.password = hash;
    const createdUser = await DB.User.create(userData);
    const resObj = {
      status: 200,
      data: createdUser,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(resObj);
  } catch (err) {
    return res.status(400).json({ error: "bad request" });
  }
});

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

//————————————————————————————— Update —————————————————————————————//

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await DB.User.findById(req.params.id);
    //console.log(updatedUser.userResorts);
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

//————————————————————————————— Login —————————————————————————————//

router.post('/login', async (req, res) => {
  try{
    // check if username or password is empty
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Please enter your username and password" });
    };

    // lookup username in database, return error msg if not found
    const foundUser = await DB.User.findOne({ username: req.body.username });
    if (!foundUser) {
      return res.status(400).json({ message: 'Username or password is incorrect' });
    };

    // check if password entered matches foundUser's password
    let passwordsMatch;
    passwordsMatch = bcrypt.compare(req.body.password, foundUser.password);
    if(!passwordsMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create new session for logged in user
    req.session.currentUser = foundUser._id;
    req.session.createdAt = new Date().toDateString();
    req.session.user = foundUser;
    res.json({foundUser})
    console.log(req.session);
  } catch (err) {
    return res.status(400).json({ error: err });
  };
});

//————————————————————————————— Export —————————————————————————————//

module.exports = router;
