const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    image: {
        data: Buffer,
        contentType: String,
        filename: String
    },
    price: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Camp', campSchema);