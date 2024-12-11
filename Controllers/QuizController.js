const Quiz = require("../Models/QuizModel");
const fs = require("fs");

const createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json({ success: true, quiz });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Obtenir tous les quiz
const GetAllQuiz = async (req, res, next) => {
    try {
        const All_quiz = await Quiz.find();
        res.json({ All_quiz });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un quiz
const UpdateQuiz = async (req, res, next) => {
    try {
        const { id } = req.params;
        const quizToUpdate = await Quiz.findById(id);

        if (!quizToUpdate) {
            return res.status(404).json({
                message: `No Quiz found with this ID: ${id}`,
            });
        }

        const { quizTitle, quizQuestions } = req.body;
        const icon = req.file?.path;

        if (icon) {
            // Supprimer l'ancienne icône
            if (quizToUpdate.icon) {
                fs.unlink(quizToUpdate.icon, (err) => {
                    if (err) console.error("Error deleting old icon:", err.message);
                });
            }
            quizToUpdate.icon = icon;
        }

        if (quizTitle) quizToUpdate.quizTitle = quizTitle;
        if (quizQuestions) quizToUpdate.quizQuestions = quizQuestions;

        await quizToUpdate.save();

        res.json({ message: "Quiz updated successfully!" });
    } catch (error) {
        next(error);
    }
};

// Supprimer un quiz
const DeleteQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Supprimer l'icône associée
        if (quiz.icon) {
            fs.unlink(quiz.icon, (err) => {
                if (err) {
                    console.error("Error deleting icon:", err.message);
                } else {
                    console.log("Icon deleted successfully!");
                }
            });
        }

        await quiz.deleteOne();

        res.json({ message: "Quiz deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuiz, GetAllQuiz, UpdateQuiz, DeleteQuiz };
