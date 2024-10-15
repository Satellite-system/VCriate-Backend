const express = require('express');
const { createQuiz, getAllQuiz, getQuizDetails, submitQuiz, getResult } = require('../controllers/quiz/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/quizzes', authMiddleware, createQuiz);
router.get('/quizzes', authMiddleware, getAllQuiz);
router.get('/quizzes/:quizId', authMiddleware, getQuizDetails);
router.post('/quizzes/:quizId/attempt', authMiddleware, submitQuiz);
router.get('/quizzes/:quizId/results', authMiddleware, getResult);

module.exports = router;