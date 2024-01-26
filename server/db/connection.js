const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/quizapp")
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB Connection Error:', error);
});

module.exports = mongoose;