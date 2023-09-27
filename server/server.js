// Import Dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg'); // Import PostgreSQL Client
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const cookieParser = require('cookie-parser');
const { S3 } = require('@aws-sdk/client-s3');


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
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: 'us-east-2',  // Ensure the region format is correct
});

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
const postssController = require('./controllers/postssController.js')

// Use Routes
app.use('/api/users', userRoute);
app.use('/posts', postRoute);

// S3 File Upload Configuration
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'pandashark',
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  })
});

// Upload Route
app.post('/api/upload', 
    upload.single('image'), 
    async (req, res, next) => {
      if (req.file) {
        const imageUrl = req.file.location;
        const query = 'INSERT INTO posts(img, likes) VALUES($1, $2) RETURNING *';
        const values = [imageUrl, 0];

        try {
          const dbResponse = await client.query(query, values);
          console.log('Record inserted:', dbResponse.rows[0]);
          res.send('Image uploaded and stored in database.');
        } catch (err) {
          console.error('Database insert error:', err);
          res.status(500).send('Internal Server Error');
        }
      }
    });

// Fetch images route 

app.get('/api/images', async (req, res) => {
  console.log('hitting api/images endpoint')
  const query = 'SELECT * FROM posts ORDER BY id';
  try {
    const dbResponse = await client.query(query);
    res.json(dbResponse.rows);
  } catch (err) {
    console.error('Database fetch error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/likes', postssController.getLikes, (req, res) => {
   res.status(200).json(res.locals.objToUpdate);
})

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
