const express = require("express");
const router = express.Router();
const DB = require("../models");
const bcrypt = require("bcryptjs");

// routes start at localhost:4000/api/v1/users

//———————————————————————— Create / Signup ————————————————————————//

router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    // validate form complete
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "All fields are required for signup." });
    }
    // validate unique username
    const foundUsername = await DB.User.findOne({ username: req.body.username });
    if (foundUsername) {
      return res.status(400).json({
        message:
          "This account already exists. Please use a different username."
      });
    }
    // validate unique email
    const foundEmail = await DB.User.findOne({ email: req.body.email });
    if (foundEmail) {
      return res.status(400).json({
        message:
          "This account already exists. Please use a different email address."
      });
    }
    // hash password and create user
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

//———————————————————————————— Show User Resorts ————————————————————————————//
router.get("/userResorts", (req, res) => {
  DB.User.findById(req.session.currentUser)
    .populate("userResorts")
    .exec((err, foundUser) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "something went wrong!", err: err });
      }
      const resObj = {
        status: 200,
        data: foundUser.userResorts,
        requestedAt: new Date().toLocaleString()
      };
      res.status(200).json(resObj);
    });
});

//————————————————————————————— Update User to Add Resort —————————————————————————————//

router.put("/userResorts/:resort_id", async (req, res) => {
  try {
    const updatedUser = await DB.User.findById(req.session.currentUser); // find user currently logged in
    updatedUser.userResorts.push(req.params.resort_id); // add resort to user by its ObjectId
    updatedUser.save(); // save changes to user
    req.session.user = updatedUser; // update current session user -> optional but could be helpful so we don't do another DB query
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "something went wrong", err: err });
  }
});

//————————————————————————————— Update User to Remove Resort —————————————————————————————//

router.delete("/userResorts/:resort_id", async (req, res) => {
  try {
    let updatedUser = await DB.User.findById(req.session.currentUser); // find user currently logged in 
    updatedUser.userResorts.pull({ _id: req.params.resort_id }) //remove a resort from user by its ObjectId
    updatedUser.save(); // save changes to user
    req.session.user = updatedUser; // update current session user -> optional but could be helpful so we don't do another DB query
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "something went wrong", err: err });
  };
});

//————————————————————————————— Login (Create Session) —————————————————————————————//

router.post("/login", async (req, res) => {
  try {
    // check if username or password is empty
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please enter your username and password" });
    }
    // lookup username in database, return error msg if not found
    const foundUser = await DB.User.findOne({ username: req.body.username });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    // check if password entered matches foundUser's password
    const passwordsMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // create new session for logged in user
    req.session.currentUser = foundUser._id;
    req.session.createdAt = new Date().toDateString();
    req.session.user = foundUser;
    res.json({ foundUser });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

//————————————————————————————— Logout (Delete Session) —————————————————————————————//

// DELETE destroy session
router.delete('/logout', (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ message: 'Unauthorized, please login and try again' })
  }
  req.session.destroy((err) => {
    if (err) return res.status(400).json(err);
    res.json({ message: 'Successfully logged out' , status: 200});
  });  
});

//————————————————————————————— Export Module —————————————————————————————//

module.exports = router;
