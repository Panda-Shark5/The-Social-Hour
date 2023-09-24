const express = require('express');
const router = express.Router();
//const User = require('../models/UserModel');
const userController = require('../controllers/userController');


router.post('/register', userController.addUser, (req, res) => {
    return res.status(200).json(res.locals.newUser);
});


module.exports = router;