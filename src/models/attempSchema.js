const mongoose = require("mongoose");
const { Schema } = mongoose;

const attemptSchema = new mongoose.Schema({
   quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   answers: [Number], // User's selected option indices
   score: Number,
   attemptDate: { type: Date, default: Date.now }
 });

 module.exports = mongoose.model('attempt', attemptSchema);