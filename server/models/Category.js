const mongoose = require('../db/connection');

const categorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true },
});

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel