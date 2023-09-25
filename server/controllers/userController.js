const User = require('../models/UserModel');
const { listen } = require('../server');
const { formidable } = require('formidable');

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

        const form = formidable({});
        let fields; let files;
        [fields, files] = await form.parse(req);

        let bodyStr = '';
        req.on("data", function (chunk) {
            bodyStr += chunk.toString();
        });
        req.on("end", function () {
            console.log(bodyStr);
        });

        //console.log('testing', JSON.stringify({ fields, files }, null, 2));
        console.log(fields['username']);
        console.log(fields['password']);

        const username = String(fields['username']);
        const password = String(fields['password']);

        console.log('username is', username);
        console.log('password is', password);
        // console.log('inside verify user. credentials are', username, password)
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