const Post = require('../models/PostModel');

const PostController = {};

PostController.addPost = async (req, res, next) => {
    const { userId, img, caption } = req.body;

    try {
        //const response = await User.create({ username: username, password: password });
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
        return next(err);
    }
}

module.exports = PostController;