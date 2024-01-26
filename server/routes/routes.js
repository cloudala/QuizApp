const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.post('/api/register', (req, res) => {
    UserModel.create(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
          res.status(500).json("Internal Server Error");
      });
});
  
router.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    UserModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            res.status(200).json("Success!");
          } else {
            res.status(401).json("Wrong password!");
          }
        } else {
          res.status(404).json("User not found!");
        }
      })
      .catch((error) => {
        res.status(500).json("Internal Server Error");
      });
});

module.exports = router;