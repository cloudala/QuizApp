const express = require('express');
const router = express.Router();
const QuizModel = require('../../models/Quiz');
const CategoryModel = require('../../models/Category');
const uuid = require('uuid');
const logToFile = require('../../logger/logger');
const mqtt = require('mqtt');

const mqttClient = mqtt.connect('mqtt://localhost:1883');
mqttClient.on("connect", () => {
  console.log("Connected to HiveMQ Broker from quizRoutes.js")
});

// Getting all quizzes
router.get('/api/quizzes', async (req, res) => {
    try {
      const quizzes = await QuizModel.find();
      const quizzesWithCategoryName = await Promise.all(
        quizzes.map(async (quiz) => {
          const category = await CategoryModel.findOne({id: quiz.category}, { _id: 0});
          return {
            id: quiz.id,
            title: quiz.title,
            categoryName: category ? category.name : 'Unknown Category',
            questions: quiz.questions.length,
          };
        })
      );
  
      res.status(200).json({quizzes: quizzesWithCategoryName});
    } catch (error) {
      console.error('Error getting quizzes:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Searching for quizzes by title
router.get('/api/quizzes/search/:pattern', async (req, res) => {
    const searchPattern = req.params.pattern;
  
    try {
      const regex = new RegExp(searchPattern, 'i');
      const quizzes = await QuizModel.find({ title: regex });
      const quizzesWithCategoryName = await Promise.all(
        quizzes.map(async (quiz) => {
          const category = await CategoryModel.findOne({id: quiz.category}, { _id: 0});
          return {
            id: quiz.id,
            title: quiz.title,
            categoryName: category ? category.name : 'Unknown Category',
            questions: quiz.questions.length,
          };
        })
      );
  
      res.status(200).json({ quizzes: quizzesWithCategoryName });
    } catch (error) {
      console.error('Error searching for quizzes:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Getting a quiz by id
router.get('/api/quizzes/:id', async (req, res) => {
    const quizId = req.params.id;
  
    try {
      const quiz = await QuizModel.findOne({ id: quizId })
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found', message: 'The specified quiz ID does not exist.' });
      }
  
      const quizWithCategoryName = {
        id: quiz.id,
        title: quiz.title,
        categoryName: quiz.category ? quiz.category.name : 'Unknown Category',
        questions: quiz.questions,
      };
  
      res.status(200).json({quiz: quizWithCategoryName});
    } catch (error) {
      console.error('Error getting quiz by ID:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Creating a new quiz
router.post('/api/quizzes', async (req, res) => {
    try {
      const { title, category, questions } = req.body;
      const generatedUuid = uuid.v4();
      const questionsWithUuid = questions.map(question => ({ ...question, id: uuid.v4() }));
      const newQuiz = new QuizModel({
        id: generatedUuid,
        title,
        category,
        questions: questionsWithUuid,
      });
  
      const savedQuiz = await newQuiz.save();
      mqttClient.publish('quiz-updates', JSON.stringify(`Quiz ${savedQuiz.title} just got added!`));
      res.status(201).json(savedQuiz);
    } catch (error) {
      console.error('Error adding quiz:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Updating a quiz with a given id
router.patch('/api/quizzes/:id', async (req, res) => {
    const quizId = req.params.id;
    const { title, category, questions } = req.body;
  
    try {
      const quiz = await QuizModel.findOne({ id: quizId })
      const updatedQuiz = await QuizModel.findOneAndUpdate(
        { id: quizId },
        { $set: { title, category, questions } },
        { new: true, projection: { _id: 0, __v: 0 } }
      );
  
      if (!updatedQuiz) {
        return res.status(404).json({ error: 'Quiz not found', message: `Quiz with ID ${quizId} not found.` });
      }
      mqttClient.publish('quiz-updates', JSON.stringify(`Quiz ${quiz.title} just got updated!`));
      res.status(200).json(updatedQuiz);
    } catch (error) {
      console.error('Error updating quiz:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  });
  
// Deleting quiz with a given id
router.delete('/api/quizzes/:id', async (req, res) => {
    const quizId = req.params.id;
  
    try {
      const quiz = await QuizModel.findOne({ id: quizId })
      const deletionResult = await QuizModel.deleteOne({ id: quizId });
  
      if (deletionResult.deletedCount === 0) {
        return res.status(404).json({ error: 'Quiz not found', message: `Quiz with ID ${quizId} not found.` });
      }
      mqttClient.publish('quiz-updates', JSON.stringify(`Quiz ${quiz.title} just got deleted!`));
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

module.exports = router