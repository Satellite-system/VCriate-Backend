const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String },
   questions: [{
     questionText: { type: String, required: true },
     options: [{ text: String }],
     correctAnswer: { type: Number, required: true } // Index of the correct option
   }],
   createdAt: { type: Date, default: Date.now }
 });
 
 module.exports = mongoose.model('quiz', quizSchema);