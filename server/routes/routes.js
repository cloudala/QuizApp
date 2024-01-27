const express = require('express');
const router = express.Router();
const categoryRoutes = require('./category/categoryRoutes')
const quizRoutes = require('./quiz/quizRoutes')
const UserModel = require('../models/User');
const QuizModel = require('../models/Quiz');
const CategoryModel = require('../models/Category');
const mqtt = require('mqtt');
const uuid = require('uuid');
const logToFile = require('../logger/logger')

const mqttClient = mqtt.connect('mqtt://localhost:1883');
mqttClient.on("connect", () => {
  console.log("Connected to HiveMQ Broker")
});

router.use(categoryRoutes)
router.use(quizRoutes)

// Registering a user
router.post('/api/register', async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    logToFile(`User ${req.body.name} created successfully!`)
    // mqttClient.publish('leaderboard', JSON.stringify(`New user signed up: ${req.body.name}`));
    res.status(201).json(user);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});
  
// Logging in a user
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: email });
      if (user && await user.comparePassword(password)) {
        res.status(200).json("Success!");
        logToFile(`User ${email} logged in successfully!`)
        // mqttClient.publish('leaderboard', JSON.stringify(`New user logged in: ${email}`));
      } else {
        res.status(401).json("Wrong password!");
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

module.exports = router;