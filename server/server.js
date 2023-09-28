// === Import Dependencies ===
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const cookieParser = require('cookie-parser');
const { S3 } = require('@aws-sdk/client-s3');

// === Initialize Express App ===
const app = express();

// === Load Environment Variables ===
dotenv.config();

// === Middleware Configuration ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// === AWS S3 Configuration ===
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_DEFAULT_REGION
});

// === PostgreSQL Database Connection ===
const client = new Client({
  connectionString: 'postgres://olohyivq:a-97tniKSJw31Bdg5-fFx1Ay3v7UDuIH@drona.db.elephantsql.com/olohyivq', // Use your ElephantSQL connection string
  ssl: { rejectUnauthorized: false },
});

// === Connect to PostgreSQL Database ===
async function connectDB() {
  try {
    await client.connect();
    console.log("Successfully connected to PostgreSQL!");
  } catch (err) {
    console.error("Connection failed", err);
  }
}

// === Disconnect from PostgreSQL Database ===
async function disconnectDB() {
  await client.end();
}



// === Start and Stop Server ===
let server;
const port = 3001;

function startServer() {
  server = app.listen(port, () => console.log(`Server is running on port ${port}`));
}

function stopServer() {
  server.close();
}

connectDB()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.error("Failed to start server due to DB connection issue:", err);
  });

// === Static File Serving ===
app.use('/assets', express.static(path.join(__dirname, '../src/assets')));

// === Route Imports ===
const userRoute = require('./routes/userRouter');
const postRoute = require('./routes/postRouter');

// === Use Routes ===
app.use('/api/users', userRoute);
app.use('/posts', postRoute);

// === S3 File Upload ===
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'pandashark',
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  })
});

// === API Routes ===

// Upload image
app.post('/api/upload', 
    upload.single('image'), 
    async (req, res, next) => {
      if (req.file) {
        const imageUrl = req.file.location;
        const query = 'INSERT INTO images(url) VALUES($1) RETURNING *';
        const values = [imageUrl];

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

// Fetch images
app.get('/api/images', async (req, res) => {
  console.log('hitting api/images endpoint')
  const query = 'SELECT url FROM images';
  try {
    const dbResponse = await client.query(query);
    res.json(dbResponse.rows);
  } catch (err) {
    console.error('Database fetch error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// General GET route
app.get('/', (req, res) => {
  res.status(200).send();
});

// === Global Error Handling ===
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

// === Start Server ===



// === Exports ===
module.exports = {
  app,
  startServer,
  stopServer,
  connectDB,
  disconnectDB
};
