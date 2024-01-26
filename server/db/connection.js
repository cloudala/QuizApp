const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/quizapp");

module.exports = mongoose;