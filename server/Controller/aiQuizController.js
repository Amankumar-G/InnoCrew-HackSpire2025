import Student from '../Schema/Student.js';
import { generateQuestionsWithLLM } from '../services/llmService.js'; // Assume you have this
const loadedQuestions = {};
const attemptedQuestions = {};
const streaks = {};

function getRandomItems(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export async function loadQuestions(req, res) {
    try {
        const studentID = req.user._id;
        const student = await Student.findById(studentID);
        if (!student) throw new Error('Student not found');
        console.log(student);
        // Generate 30 questions from LLM service based on user profile
        const allQuestions = await generateQuestionsWithLLM(student);

        // Separate by difficulty
        const easyQuestions = allQuestions.filter(q => q.difficulty === 1);
        const mediumQuestions = allQuestions.filter(q => q.difficulty === 2);
        const hardQuestions = allQuestions.filter(q => q.difficulty === 3);

        loadedQuestions[studentID] = {
            1: easyQuestions,
            2: mediumQuestions,
            3: hardQuestions
        };

        attemptedQuestions[studentID] = [];
        streaks[studentID] = {};

        req.session.currentDifficulty = { [studentID]: 1 };
        req.session.questionIndexes = { [studentID]: { 1: 0, 2: 0, 3: 0 } };
        req.session.score = { [studentID]: 0 };
        req.session.questionNumber = { [studentID]: 1 };
        req.session.totalQuestions = { [studentID]: 15 };

        console.log('Questions loaded and session initialized:', req.session);

        return res.json({
            message: 'Questions loaded successfully. Ready to start quiz.'
        });
    } catch (error) {
        console.error('Error loading questions:', error);
        res.status(500).send('Failed to load questions');
    }
}

export function retrieveQuestion(req, studentID, difficulty) {
    const questions = loadedQuestions[studentID][difficulty];
    const currentIndex = req.session.questionIndexes[studentID][difficulty];

    if (!questions || questions.length === 0) throw new Error('Questions not loaded.');
    if (currentIndex >= questions.length) throw new Error('No more questions at this difficulty.');

    const selectedQuestion = questions[currentIndex];
    req.session.questionIndexes[studentID][difficulty] += 1;
    return selectedQuestion;
}

export function updateStreakAndDifficulty(req, studentID, correct) {
    const currentDifficulty = req.session.currentDifficulty[studentID] || 1;
    const streakKey = `difficulty_${currentDifficulty}`;
    if (!streaks[studentID][streakKey]) streaks[studentID][streakKey] = { correct: 0, incorrect: 0 };

    if (correct) {
        req.session.score[studentID] += 1;
        streaks[studentID][streakKey].correct += 1;
        streaks[studentID][streakKey].incorrect = 0;
        if (streaks[studentID][streakKey].correct === 2) {
            req.session.currentDifficulty[studentID] = Math.min(currentDifficulty + 1, 3);
            streaks[studentID][streakKey].correct = 0;
        }
    } else {
        streaks[studentID][streakKey].incorrect += 1;
        streaks[studentID][streakKey].correct = 0;
        if (streaks[studentID][streakKey].incorrect === 2) {
            req.session.currentDifficulty[studentID] = Math.max(currentDifficulty - 1, 1);
            streaks[studentID][streakKey].incorrect = 0;
        }
    }
    return req.session.currentDifficulty[studentID];
}

export async function startQuizSession(req, res) {
    try {
        const studentID = req.user._id;
        if (!loadedQuestions[studentID]) {
            return res.status(400).send('Questions not loaded. Please load questions first.');
        }

        const currentDifficulty = req.session.currentDifficulty[studentID];
        const firstQuestion = retrieveQuestion(req, studentID, currentDifficulty);

        return res.json({
            message: 'Quiz session started. Here is the first question.',
            question: firstQuestion,
            score: req.session.score[studentID]
        });
    } catch (error) {
        console.error('Error starting quiz session:', error);
        res.status(500).send('Failed to start quiz');
    }
}

export async function answerQuestion(req, res) {
    try {
        const { correct } = req.body;
        const studentID = req.user._id;

        let currentDifficulty = req.session.currentDifficulty[studentID] || 1;
        if (correct !== undefined) {
            currentDifficulty = updateStreakAndDifficulty(req, studentID, correct);
        }
        req.session.currentDifficulty[studentID] = currentDifficulty;

        const score = req.session.score[studentID];
        const questionNum = req.session.questionNumber[studentID];
        const totalQuestions = req.session.totalQuestions[studentID];

        if (questionNum > totalQuestions) {
            // Quiz completed
            delete loadedQuestions[studentID];
            delete attemptedQuestions[studentID];
            delete streaks[studentID];
            delete req.session.currentDifficulty[studentID];
            delete req.session.questionIndexes[studentID];
            delete req.session.score[studentID];
            delete req.session.questionNumber[studentID];
            delete req.session.totalQuestions[studentID];

            return res.json({
                message: 'Quiz ended.',
                score
            });
        }

        const nextQuestion = retrieveQuestion(req, studentID, currentDifficulty);
        req.session.questionNumber[studentID] += 1;

        return res.json({
            message: 'Next question retrieved.',
            question: nextQuestion,
            score
        });

    } catch (error) {
        console.error('Error answering question:', error);
        res.status(500).send('Failed to answer question');
    }
}
