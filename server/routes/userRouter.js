const express = require('express');
const router = express.Router();
const db = require('../db');
//const User = require('../models/UserModel');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

router.post('/register', userController.addUser, (req, res) => {
  res.status(200).send();
});

router.post('/login', userController.verifyUser, (req, res) => {
  console.log('inside post login');
  res.status(200).send();
});

module.exports = router;
