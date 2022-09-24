const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    capacity: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);