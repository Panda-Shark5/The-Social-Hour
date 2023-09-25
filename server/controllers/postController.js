const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const fs = require('fs');
const path = require('path');

const PostController = {};

function base64_encode(file) {
    return "data:image/jpeg;base64," + fs.readFileSync(file, 'base64');
}

PostController.addPost = async (req, res, next) => {

    const caption = req.body.caption;
    const img = req.file.filename;

    const encodedImage = base64_encode(path.join(__dirname, img));

    try {
        const newPost = new Post({
            img: encodedImage,
            caption: caption
        });
        const post = await newPost.save();
        res.locals.newPost = post;
        return next();
    } catch (err) {
        return next({});
    }
}

PostController.getUserPosts = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username });
        const posts = await Post.find({ userId: user._id });
        res.locals.UserPosts = posts;
        return next();
    } catch (err) {
        return next(err);
    }
}

PostController.getAllPosts = async (req, res, next) => {
    try {
        const posts = Post.find({});
        res.locals.allPosts = posts;
        return next();
    } catch (err) {
        return next(err);
    }
}


module.exports = PostController;