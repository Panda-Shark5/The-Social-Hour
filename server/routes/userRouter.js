const express = require('express');
const router = express.Router();
const db = require('../db');
//const User = require('../models/UserModel');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')


router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check for an existing user with the same username or email
        const userExists = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

        if (userExists) {
            return res.status(400).json({ message: 'Username or email is already in use.' });
        }

        // Insert the new user into the database
        await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);

        // You can add additional logic here, such as setting cookies

        return res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'An error occurred during registration.' });
    }
})

module.exports = router;