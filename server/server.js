const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const userRoute = require('./routes/userRouter');
const postRoute = require('./routes/postRouter');

const port = 3001;

mongoose.connect("mongodb+srv://pkarwe62:JFZBtUu007N2kkwN@cluster0.ru954su.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Successfully connected to MongoDB!");
});

app.use('/users', userRoute);
//app.use('/posts', postRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
