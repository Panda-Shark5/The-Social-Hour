const express = require('express');
const router = express.Router();
//const User = require('../models/UserModel');
//const userController = require('../controllers/postController');
const PostController = require('../controllers/postController');


router.post('/', PostController.addPost, (req, res) => {
    return res.status(200).json(res.locals.newPost);
});





router.get('/', PostController.getAllPosts, (req, res) => {
    return res.status(200).json(res.locals.allPosts);
});

router.get('/username', PostController.getUserPosts, (req, res) => {
    return res.status(200).json(res.locals.UserPosts);
});

module.exports = router;