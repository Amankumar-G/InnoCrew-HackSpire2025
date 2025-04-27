// quizRouter.js
import express from 'express';
import { generateQuestionsWithLLM } from '../services/llmService.js';
import Student from '../Schema/Student.js';
import wrapAsync from '../utils/wrapAsync.js';
import passport from "passport";
const router = express.Router();

// Load questions using LLM based on user profile
router.get('/', passport.authenticate('jwt', { session: false }), wrapAsync(async(req, res) => {
  const studentID = req.user._id;
  const student = await Student.findById(studentID);
  if (!student) throw new Error('Student not found');
  
  // Prepare the learning summary
  const learningSummary = student.learningPath.map(subtopic => ({
    subtopic_name: subtopic.subtopic_name,
    goal_statement: subtopic.goal_statement,
    key_deliverables: subtopic.key_deliverables
  }));

  // Generate 30 questions using the learning summary
  const allQuestions = await generateQuestionsWithLLM(learningSummary);

  res.status(200).send({ message: 'Questions generated successfully', questions: allQuestions });
}));

export default router;
