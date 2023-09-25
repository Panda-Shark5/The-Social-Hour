const express = require('express');
const router = express.Router();
//const User = require('../models/UserModel');
const userController = require('../controllers/userController');


router.post('/register', userController.addUser, (req, res) => {
    return res.status(200).json(res.locals.newUser);
});

router.post('/login', userController.verifyUser, (req, res) => {
    return res.status(200).redirect('/profile');
});

router.get('/:id', userController.getUser, (req, res) => {
    return res.status(200).json(res.locals.user);
});


module.exports = router;