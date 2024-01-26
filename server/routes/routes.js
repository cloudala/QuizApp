const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.post('/api/register', async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});
  
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email: email });
  
      if (user && await user.comparePassword(password)) {
        res.status(200).json("Success!");
      } else {
        res.status(401).json("Wrong password!");
      }
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
});

module.exports = router;