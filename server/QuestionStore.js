const QuestionDAO = require('./QuestionDAO');

var QuestionStore = {
    questions: [],
    methods: {
        // Uses QuestionDAO to load questions from database into the questions array.
        loadQuestions(num) {
            return new Promise((resolve, reject) => {
                // Only fetch questions if the array is empty.
                if(QuestionStore.questions.length === 0) {
                    QuestionDAO.randomQuestions(num)
                    .then((rows) => {
                        for(let i = 0; i < rows.length; i++) {
                            QuestionStore.questions.push(
                            {   
                                player: null,
                                question: rows[i].questiontext,
                                answer: null
                            });
                        }
                        resolve(QuestionStore.questions);
                    })
                    .catch((err) => {
                        console.log("An error occured in loadQuestions!");
                        reject("An error occured in loadQuestions!");
                    })
                }
            })
        },
        getQuestions(name) {
            if(!name) {
                return QuestionStore.questions;
            }
            else {
                return QuestionStore.questions.filter((q) => {
                    return q.player === name;
                });
            }
        },
        assignPlayers(players) {
            return new Promise((resolve, reject) => {
                QuestionStore.methods.loadQuestions(players.length * 2).then(() => {
                    for(let i = 0; i < players.length; i++) {
                        QuestionStore.questions[i * 2].player = players[i].name;
                        QuestionStore.questions[i * 2 + 1].player = players[i].name;
                    }
                    resolve(QuestionStore.questions);
                })
                .catch((err) => {
                    reject("An error occurred while assigning questions.")
                });
            })
        },
        // Answers the given question if it exists and player is correct
        answer(question, answer, player) {
            for(q in QuestionStore.questions) {
                var current = QuestionStore.questions[q];
                if(current.question === question && current.player === player) {
                    current.answer = answer
                }
            }
        },
        // Answer all given questions for the provided player
        answerQuestions(player, answers) {
            // Questions provided from player
            for(a in answers) {
                QuestionStore.methods.answer(answers[a].question, answers[a].answer, player)
            }
        },
    },
}

exports.getQuestions = QuestionStore.methods.getQuestions;
exports.assignPlayers = QuestionStore.methods.assignPlayers;
exports.answerQuestions = QuestionStore.methods.answerQuestions;