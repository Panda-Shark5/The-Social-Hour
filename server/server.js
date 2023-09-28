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
  region: 'us-east-2',
});

// === PostgreSQL Database Connection ===
const client = new Client({
  connectionString: 'postgres://...', // Use your ElephantSQL connection string
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

function startServer() {
  server = app.listen(port, () => console.log(`Server is running on port ${port}`));
}

function stopServer() {
  server.close();
}

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
app.post('/api/upload', upload.single('image'), async (req, res) => { /* ... */ });

// Fetch images
app.get('/api/images', async (req, res) => { /* ... */ });

// General GET route
app.get('/', (req, res) => {
  res.status(200).send();
});

// === Global Error Handling ===
app.use('/*', (err, req, res, next) => { /* ... */ });

// === Start Server ===
const port = 3001;
startServer();

// === Exports ===
module.exports = {
  app,
  startServer,
  stopServer,
  connectDB,
  disconnectDB
};
