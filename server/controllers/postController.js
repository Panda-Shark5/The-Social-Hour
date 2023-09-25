const Post = require('../models/PostModel');

const PostController = {};

PostController.addPost = async (req, res, next) => {
    const { userId, img, caption } = req.body;

    try {
        const newPost = new Post({
            userId: userId,
            img: img,
            caption: caption
        });
        console.log(newPost);
        const post = await newPost.save();
        res.locals.newPost = post;
        return next();
    } catch (err) {
        return next({});
    }
}

PostController.upload = async (req, res, next) => {
    const { img } = req.body; //pulling img from req.body??

    try {
        req.img = img //passing it on to the next middleware, which is post??
        next()
    } catch (err) {
        return next({})
    } 
}

module.exports = PostController;