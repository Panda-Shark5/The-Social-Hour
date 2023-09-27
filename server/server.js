// Import Dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg'); // Import PostgreSQL Client
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const cookieParser = require('cookie-parser');
const AWS = require('aws-sdk'); // AWS SDK setup

// Initialize Express App
const app = express();

// Load Environment Variables
dotenv.config();

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// AWS S3 Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'US East (Ohio) us-east-2'
});
const s3 = new AWS.S3();

// Database Connection using PostgreSQL
const client = new Client({
  // Use your ElephantSQL connection string
  connectionString: 'postgres://olohyivq:a-97tniKSJw31Bdg5-fFx1Ay3v7UDuIH@drona.db.elephantsql.com/olohyivq',
  ssl: { rejectUnauthorized: false },
});
client.connect()
  .then(() => console.log("Successfully connected to PostgreSQL!"))
  .catch(err => console.error("Connection failed", err));

// Static Files
app.use('/assets', express.static(path.join(__dirname, '../src/assets')));

// Import Routes
const userRoute = require('./routes/userRouter');
const postRoute = require('./routes/postRouter');

// Use Routes
app.use('/api/users', userRoute);
app.use('/posts', postRoute);

// S3 File Upload Configuration
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'PandaShark',
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  })
});

// Upload Route
app.post('/api/upload', 
    (req, res, next) => {
        console.log("Before upload.single");
        next();
    }, 
    upload.single('file'), 
    (err, req, res, next) => {
        if (err) {
          console.log('Multer error:', err);
          return res.status(400).json({error: err.message});
        }
        next();
    },
    (req, res) => {
        console.log('passed upload.single middleware');
        const imageUrl = req.file.location;
        // store image in DB
        res.redirect('http://localhost:3000/feed');
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

// Start Server
const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
