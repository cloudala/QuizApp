const mongoose = require('../db/connection')
const questionSchema = require('./Question');
const CategoryModel = require('./Category');

const isValidUUID = (value) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(value);
};

const isValidCategory = async (value) => {
  const category = await CategoryModel.findOne({ id: value });
  return !!category;
};

const quizSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: {
    type: String,
    required: true,
    validate: [
      {
        validator: (value) => isValidUUID(value),
        message: 'Invalid UUID format.',
      },
      {
        validator: (value) => isValidCategory(value),
        message: 'Category does not exist.',
      },
    ],
  },
  questions: [questionSchema],
});

const QuizModel = mongoose.model('Quiz', quizSchema);

module.exports = QuizModel;