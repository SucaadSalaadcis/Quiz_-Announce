import quizModel from "../models/quizModel.js";

// get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quiz = await quizModel.find();
        res.status(200).json({
            count: quiz.length,
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get one quiz by id 
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await quizModel.findById(id);
        res.send({
            quiz
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
};


// create a new quiz
const createQuiz = async (req, res) => {
    try {
        const { name, course, topic, questions } = req.body;
        // checking if required fields is same as model
        if (!req.body.name || !req.body.course || !req.body.topic 
            || !questions || !Array.isArray(questions)) {
            return res.status(400).send({
                message: "Send all required fields : name, course, topic, questions (array)"
            });
        } 

        const newQuiz = {
            name: name,
            course: course,
            topic: topic,
            questions: questions
        }

        const quiz = await quizModel.create(newQuiz);
        return res.status(201).send(quiz);


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
};

// update quiz
const updateQuiz = async (req, res) => {
    try {
        const { name, course, topic, questions } = req.body;

        // checking if required fields is same as model
        if (!name || !course || !topic  || !questions || !Array.isArray(questions)) {
            return res.status(400).send({
                message: "Send all required fields: name, course, topic, questions (array)"
            });
        }

        const { id } = req.params;
        const result = await quizModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).send({
                message: "Quiz not found"
            });
        } else {
            return res.status(200).send({
                message: "Quiz updated successfully...",
                data: result
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

// delete quiz
const deleteQuiz = async (req, res) => {
    try {

        const { id } = req.params;
        const result = await quizModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: "Quiz not found"
            });
        } else {
            return res.status(200).send({
                message: "Quiz deleted successfully..."
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
};


export const quizController = { getAllQuizzes, getById, createQuiz, updateQuiz, deleteQuiz }

