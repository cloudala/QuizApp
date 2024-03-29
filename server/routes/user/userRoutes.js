const express = require('express');
const router = express.Router();
const UserModel = require('../../models/User');
const uuid = require('uuid');
const logToFile = require('../../logger/logger')
const mqtt = require('mqtt');

const mqttClient = mqtt.connect('mqtt://localhost:1883');
mqttClient.on("connect", () => {
  console.log("Connected to HiveMQ Broker from userRoutes.js")
});

// Registering a user
router.post('/api/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new UserModel({
        email,
        name,
        password,
        id: uuid.v4(),
        correctAnswers: 0,
        favourite: '',
        history: []
      });
      await user.save();
      logToFile(`User ${req.body.name} created successfully!`)
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
          res.status(200).json({id: user.id});
          const currentTime = new Date().toLocaleTimeString();
          logToFile(`User ${email} logged in successfully at ${currentTime}!`)
          mqttClient.publish('active-users', JSON.stringify({userId: user.id, userName: user.name, currentTime}));
        } else {
          res.status(401).json("Wrong password!");
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});
  
// Getting user info
router.get('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findOne({ id: userId }, {_id: 0, __v: 0});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found', message: `User with ID ${userId} not found.` });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error getting user information:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Deleting a user
router.delete('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await UserModel.deleteOne({ id: userId });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'Not Found', message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Deleting a user's history
router.delete('/api/users/:id/history', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findOne({ id: userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found', message: `User with ID ${userId} not found.` });
      }
  
      user.history = [];
      await user.save();
  
      res.status(200).json({ message: `History for user with ID ${userId} deleted successfully.` });
    } catch (error) {
      console.error('Error deleting user history:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});
  
// Updating a user's favourite quiz
router.patch('/api/users/:id/favourite', async (req, res) => {
    try {
      const userId = req.params.id;
      const { favourite } = req.body;
      const user = await UserModel.findOne({ id: userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found', message: `User with ID ${userId} not found.` });
      }
  
      user.favourite = favourite;
      await user.save();
  
      res.status(200).json({ message: `Favorite quiz for user with ID ${userId} updated successfully.` });
    } catch (error) {
      console.error('Error updating user favorite quiz:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// Updating a user's data
router.patch('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found', message: `User with ID ${userId} not found.` });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ message: `User with ID ${userId} updated successfully.` });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = router