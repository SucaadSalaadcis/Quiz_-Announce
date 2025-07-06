import express from 'express';
import { quizController } from '../controllers/quizController.js';

const router = express.Router();

router.get('/quizzes', quizController.getAllQuizzes);
router.get("/quizzes/:id", quizController.getById);
router.post("/quizzes", quizController.createQuiz);
router.put("/quizzes/:id", quizController.updateQuiz);
router.delete("/quizzes/:id", quizController.deleteQuiz);

export default router;