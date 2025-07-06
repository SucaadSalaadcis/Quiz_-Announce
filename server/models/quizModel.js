import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    name: String,
    course: String,
    topic: String,
    date: {
        type: Date,
        default: Date.now,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true
            },
            options: [
                {
                    type: String,
                    required: true
                }
            ],
            correctAnswer: {
                type: String,
                required: true
            }
        }
    ]
    ,
}, { timestamps: true });

const quizModel = mongoose.model('Quiz', QuizSchema);

export default quizModel;
