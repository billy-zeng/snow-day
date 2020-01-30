const express = require('express');
const router = express.Router();
const path = require('path');

// Serve public directory
router.use(express.static(path.join(__dirname, '../public')));

// GET Home Page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/homepage.html'));
});

// GET Signup Page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// GET Login Page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// GET Main Gallery Page
router.get('/maingallery', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/maingallery.html'));
});

// GET User Gallery Page
router.get('/usergallery', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/usergallery.html'));
});

module.exports = router;