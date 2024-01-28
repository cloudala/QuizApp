const express = require('express');
const router = express.Router();
const QuizModel = require('../../models/Quiz');
const UserModel = require('../../models/User');
const uuid = require('uuid');
const logToFile = require('../../logger/logger');
const mqtt = require('mqtt');

const mqttClient = mqtt.connect('mqtt://localhost:1883');
mqttClient.on("connect", () => {
  console.log("Connected to HiveMQ Broker from answerRoutes.js")
});

// Helper function to calculate the score
function calculateScore(questions, userAnswers) {
    return questions.reduce((score, question, index) => {
      const correctOption = question.correctOption;
      const userAnswer = userAnswers[index];
  
      return userAnswer === correctOption ? score + 1 : score;
    }, 0);
}

// Quiz answer endpoint
router.post('/api/quizzes/:id/submit', async (req, res) => {
    try {
      const quizId = req.params.id;
      const userId = req.body.userId;
      const userAnswers = req.body.answers;
  
      const quiz = await QuizModel.findOne({ id: quizId });
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found', message: `Quiz with ID ${quizId} not found.` });
      }
  
      const calculatedScore = calculateScore(quiz.questions, userAnswers);
      const user = await UserModel.findOne({ id: userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found', message: `User with ID ${userId} not found.` });
      }
  
      user.history.push({
        id: quizId,
        result: calculatedScore,
        timestamp: new Date(),
      });
  
      user.correctAnswers = (user.correctAnswers || 0) + calculatedScore;
      await user.save();
      mqttClient.publish('leaderboard', JSON.stringify({userId: user.id, userName: user.name, correctAnswers: user.correctAnswers}));
      res.status(200).json({ score: calculatedScore, feedback: 'Your quiz submission was successful.' });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

module.exports = router