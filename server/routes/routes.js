const express = require('express');
const router = express.Router();
const categoryRoutes = require('./category/categoryRoutes')
const quizRoutes = require('./quiz/quizRoutes')
const userRoutes = require('./user/userRoutes')
const answerRoutes = require('./answer/answerRoutes')

router.use(userRoutes)
router.use(categoryRoutes)
router.use(quizRoutes)
router.use(answerRoutes)

module.exports = router;