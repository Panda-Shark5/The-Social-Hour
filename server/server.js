const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


app.use(express.urlencoded())
app.use(bodyParser.json())

app.use(cors())

dotenv.config();

const userRoute = require('./routes/userRouter');
const postRoute = require('./routes/postRouter');

const port = 3001;

mongoose.connect("mongodb+srv://pkarwe62:JFZBtUu007N2kkwN@cluster0.ru954su.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Successfully connected to MongoDB!");
});

app.use('../src/assets', express.static(path.join(__dirname, '../src/assets')));
app.use('/users', userRoute);
app.use('/posts', postRoute);

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
        //return res.status(200).json('File successfully uploaded');

        // Added redirect because multer keeps sending the user to /api/upload

        return res.redirect('http://localhost:3000/feed');
    } catch (err) {
        console.log(err);
    }
});

//global error
app.use('/*', (err, req, res, next) => {
    const defaultErr = {
        log: 'Global Error',
        status: 500,
        message: { err: 'An Error Has Ocurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
