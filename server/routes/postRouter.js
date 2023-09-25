const express = require('express');
const router = express.Router();
//const User = require('../models/UserModel');
const userController = require('../controllers/postController');
const PostController = require('../controllers/postController');


router.post('/', PostController.addPost, (req, res) => {
    return res.status(200).json(res.locals.newPost);
});


module.exports = router;