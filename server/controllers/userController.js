const User = require('../models/UserModel');
const { formidable } = require('formidable')

const UserController = {};

UserController.addUser = async (req, res, next) => {
    console.log('inside adduser')
    try {
        const form = formidable({});
        let fields; let files;
        [fields, files] = await form.parse(req)

        const username = String(fields['username']);
        const password = String(fields['password']);

        console.log('username is', username)
        console.log('password is', password)

        const user = await User.create({ username: username, password: password })
        console.log('created user is', user)
        if (user) {
            return next()
        } else {
            res.redirect('http://localhost:3000/signup')
        }
    } catch (err) {
        res.redirect('http://localhost:3000/signup')
    }
}

UserController.verifyUser = async (req, res, next) => {
    try {

        const form = formidable({});
        let fields; let files;
        [fields, files] = await form.parse(req)

        const username = String(fields['username']);
        const password = String(fields['password']);

        console.log('username is', username)
        console.log('password is', password)

        const user = await User.findOne({ username: username, password: password })
        res.locals.verfiedUser = user
        if (user) {
            return next()
        } else {
            res.redirect('http://localhost:3000/login')
        }
    }
    catch (err) {
        return next(err)
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