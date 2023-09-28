const express = require('express');
const router = express.Router();
const db = require('../db');
//const User = require('../models/UserModel');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

router.post('/register', userController.addUser, async (req, res) => {
  console.log('inside post');
  res.status(200).send();
});

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     console.log('hitting login endpoint');
//     // Check for an existing user with the same username or email
//     const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [
//       username,
//     ]);

//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: 'Incorrect username or password.' });
//     }

//     // Check that the password matches
//     if (password !== user.password) {
//       return res
//         .status(400)
//         .json({ message: 'Incorrect username or password.' });
//     }

//     return res.status(200).json({ message: 'Login successful.' });
//   } catch (error) {
//     console.error('Error during login:', error);
//     return res.status(500).json({ message: 'An error occurred during login.' });
//   }

// router.post('/register', userController.addUser, (req, res) => {
//   res.status(200).send();
// });

router.post('/login', userController.verifyUser, (req, res) => {
  console.log('inside post login');
  res.status(200).send();
});

module.exports = router;
