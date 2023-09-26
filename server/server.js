// Import Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const { Client } = require('pg'); // Import PostgreSQL Client
// const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');

// Initialize Express App
const app = express();

// Configuration and Middleware
dotenv.config(); // Load environment variables
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors()); // Enable CORS
app.use(cookieParser()); // Parse cookies

// Database Connection
const client = new Client({
    connectionString:'postgres://olohyivq:a-97tniKSJw31Bdg5-fFx1Ay3v7UDuIH@drona.db.elephantsql.com/olohyivq' /*process.env.ELEPHANTSQL_URL*/, // Use your ElephantSQL connection string
    ssl: { rejectUnauthorized: false }, // Necessary for ElephantSQL, remove in production
});

client.connect()
    .then(() => console.log("Successfully connected to PostgreSQL!"))
    .catch(err => console.error("Connection failed", err));

// mongoose.connect("mongodb+srv://pkarwe62:JFZBtUu007N2kkwN@cluster0.ru954su.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("Successfully connected to MongoDB!");
// });

// Static Files
app.use('/assets', express.static(path.join(__dirname, '../src/assets')));

// Route Imports
const userRoute = require('./routes/userRouter');
const postRoute = require('./routes/postRouter');

// Route Handling
app.use('/api/users', userRoute);
app.use('/posts', postRoute);

// File Upload Handling
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: imageStorage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        // Redirect to the desired URL after successful file upload
        return res.redirect('http://localhost:3000/feed');
    } catch (err) {
        console.log(err);
    }
});

// Global Error Handling
app.use('/*', (err, req, res, next) => {
    const defaultErr = {
        log: 'Global Error',
        status: 500,
        message: { err: 'An Error Has Occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

// Start the Server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
