const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const port = 3001;

mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Successfully connected to MongoDB!");
});


app.get('/api/test', (req, res) => {
    return res.status(200).send("Our server works holy shit!");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
