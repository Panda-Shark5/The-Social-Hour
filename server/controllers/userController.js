const User = require('../models/UserModel');
const { formidable } = require('formidable');
const db = require('../db');
const bcrypt = require('bcrypt');

const UserController = {};

UserController.addUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    console.log('hitting register endpoint');
    // Check for an existing user with the same username or email
    const userExists = await db.oneOrNone(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists) {
      console.log('checking if user exists');

      return res
        .status(400)
        .json({ message: 'Username or email is already in use.' });
    }
    console.log('after userExist query');
    //bcrypting password
    console.log('before hashing');
    const hash = await bcrypt.hash(password, 10);
    console.log('after hashing');
    //bcrypting password
    // const hash = await bcrypt.hash(password, 10);
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
//   try {
//     const form = formidable({});
//     let fields;
//     let files;
//     [fields, files] = await form.parse(req);

//     const username = String(fields['username']);
//     const password = String(fields['password']);

//     console.log('username is', username);
//     console.log('password is', password);

//     const user = await User.findOne({ username: username, password: password });
//     res.locals.verfiedUser = user;
//     if (user) {
//       return next();
//     } else {
//       res.redirect('http://localhost:3000/login');
//     }
//   } catch (err) {
//     return next(err);
    
  const { username, password } = req.body;

  try {
    console.log('hitting login endpoint');
    // Check for an existing user with the same username or email
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password.' });
    }
    // Check that the password matches
    console.log('before checking');
    const isValid = await bcrypt.compare(password, user.password);
    console.log('after');
    if (!isValid) {
      return res.status(500).message({ message: "Credentials don't match" });
    }
    next();
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login.' });
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
