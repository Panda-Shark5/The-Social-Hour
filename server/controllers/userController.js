const User = require('../models/UserModel');
const { formidable } = require('formidable');
const db = require('../db');
const bcrypt = require('bcrypt');

const UserController = {};

UserController.addUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check for an existing user with the same username or email
    const userExists = await db.oneOrNone(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'Username or email is already in use.' });
    }
    //bcrypting password
    const hash = await bcrypt.hash(password, 10);
    // Insert the new user into the database
    await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [
      username,
      hash,
    ]);
    next();
  } catch (error) {
    console.error('Error during registration:', error);
    return res
      .status(500)
      .json({ message: 'An error occurred during registration.' });
  }
};

UserController.verifyUser = async (req, res, next) => {
  try {
    const form = formidable({});
    let fields;
    let files;
    [fields, files] = await form.parse(req);

    const username = String(fields['username']);
    const password = String(fields['password']);

    console.log('username is', username);
    console.log('password is', password);

    const user = await User.findOne({ username: username, password: password });
    res.locals.verfiedUser = user;
    if (user) {
      return next();
    } else {
      res.redirect('http://localhost:3000/login');
    }
  } catch (err) {
    return next(err);
  }
};

UserController.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = UserController;
