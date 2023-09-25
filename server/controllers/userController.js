const User = require('../models/UserModel');

const UserController = {};

UserController.addUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        //const response = await User.create({ username: username, password: password });
        const newUser = new User({
            username: username,
            password: password
        });
        console.log(newUser);
        const user = await newUser.save();
        res.locals.newUser = user;
        return next();
    } catch (err) {
        return next(err);
    }
}

UserController.verifyUser = async (req, res, next) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username, password: password });
        res.locals.verifiedUser = user;
        return next();
    } catch (err) {
        return next(err);
    }

}

UserController.getUser = async (req, res, next) => {

    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        res.locals.user = user;
        return next();
    } catch (err) {
        return next(err);
    }

}

module.exports = UserController;