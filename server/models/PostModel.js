const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        img: {
            type: String,
            required: true,
        },

        caption: {
            type: String,
            max: 300
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);