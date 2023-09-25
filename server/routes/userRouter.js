const express = require('express');
const router = express.Router();
//const User = require('../models/UserModel');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')


router.post('/register', userController.addUser, cookieController.setSSIDCookie, (req, res) => {
    return res.status(200).redirect('http://localhost:3000/feed');
});

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
    return res.status(200).redirect('http://localhost:3000/feed');
});

router.get('/:id', userController.getUser, (req, res) => {
    return res.status(200).json(res.locals.user);
});


module.exports = router;