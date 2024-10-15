const Quiz = require('../../models/quizSchema');
const Attempt = require('../../models/attempSchema');


// @Desc - Create a quiz
// @route - POST /api/quiz/quizzes
// @access - Protected
// TESTED - YES
 const createQuiz = async (req, res) => {
   const { title, description, questions } = req.body;
 
   try {
     // Create new quiz
     const newQuiz = new Quiz({
       title,
       description,
       questions,
       createdBy: req.user.userId // Authenticated user's ID from JWT
     });
 
     // Save the quiz to the database
     await newQuiz.save();
 
     res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
   } catch (err) {
     res.status(500).json({ message: 'Server error', error: err.message });
   }
 };

// @Desc - Get all quizzes list
// @route - GET /api/quiz/quizzes
// @access - Protected
// TESTED - YES
const getAllQuiz = async (req, res) => {
   try {
     const quizzes = await Quiz.find().select('title description createdAt'); // Only select specific fields
     res.status(200).json(quizzes);
   } catch (err) {
     res.status(500).json({ message: 'Server error', error: err.message });
   }
 };

// @Desc - Get quiz details
// @route - GET /quizzes/:quizId 
// @access - Protected
// TESTED - YES 
const getQuizDetails = async (req, res) => {
   const { quizId } = req.params;
 
   try {
     const quiz = await Quiz.findById(quizId).select('-questions.correctAnswer'); // Hide correctAnswer field
 
     if (!quiz) {
       return res.status(404).json({ message: 'Quiz not found' });
     }
 
     res.status(200).json(quiz);
   } catch (err) {
     res.status(500).json({ message: 'Server error', error: err.message });
   }
 };

// @Desc - Submit quiz answers
// @route - POST /quizzes/:quizId/attempt
// @access - Protected
// TESTED - YES
const submitQuiz =  async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body; // Array of selected answers (indices)

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;

    // Calculate score
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    // Save attempt result
    const newAttempt = new Attempt({
      quizId,
      userId: req.user.userId,
      answers,
      score
    });

    await newAttempt.save();

    res.status(200).json({ message: 'Quiz submitted', score, totalQuestions });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @Desc - View user’s previous attempts
// @route - GET /quizzes/:quizId/results
// @access - Protected
// TESTED - YES
const getResult = async (req, res) => {
   const { quizId } = req.params;
 
   try {
     const attempts = await Attempt.find({
       quizId,
       userId: req.user.userId // Filter attempts by authenticated user
     }).select('score attemptDate');
 
     if (!attempts || attempts.length === 0) {
       return res.status(404).json({ message: 'No attempts found for this quiz' });
     }
 
     res.status(200).json(attempts);
   } catch (err) {
     res.status(500).json({ message: 'Server error', error: err.message });
   }
 };
 
module.exports = {createQuiz, getAllQuiz, getQuizDetails, submitQuiz, getResult}