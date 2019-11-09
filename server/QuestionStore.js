const QuestionDAO = require('./QuestionDAO');

var QuestionStore = {
    questions: [],
    methods: {
        // Uses QuestionDAO to load questions from database into the questions array.
        loadQuestions(num) {
            return new Promise((resolve, reject) => {
                // Only fetch questions if the array is empty.
                if(QuestionStore.questions.length === 0) {
                    qs = []
                    QuestionDAO.randomQuestions(num)
                    .then((rows) => {
                        for(let i = 0; i < rows.length; i++) {
                            qs.push(rows[i].questiontext);
                        }
                        resolve(qs);
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
        orderQuestionsForVoting() {
            // Return questions sorted into pairs by the text of the question
            return QuestionStore.questions.sort((a, b) => (a.question > b.question) ? 1 : -1);
        },
        assignPlayers(players) {
            return new Promise((resolve, reject) => {
                // 2 questions for each player, 2 players per question. So equal # players and questions.
                // Randomize players
                shuffle(QuestionStore.questions);
                // Load questions, then assign each question to two different players
                QuestionStore.methods.loadQuestions(players.length).then((qs) => {
                    assignedQuestions = [];
                    // Each player gets assigned two unique questions (unique provided more than 1 player)
                    for(let i = 0; i < players.length; i++) {
                        assignedQuestions.push
                        ({   
                                player: players[i].name,
                                question: qs[i],
                                answer: null
                            });
                        assignedQuestions.push
                        ({   
                                player: players[i].name,
                                question: qs[(i + 1) % (qs.length)],
                                answer: null
                            });
                    }
                    QuestionStore.questions = assignedQuestions;
                    resolve(assignedQuestions);
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

// Helper function to shuffle an array, thanks Stackoverflow
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

exports.getQuestions = QuestionStore.methods.getQuestions;
exports.assignPlayers = QuestionStore.methods.assignPlayers;
exports.answerQuestions = QuestionStore.methods.answerQuestions;
exports.orderQuestionsForVoting = QuestionStore.methods.orderQuestionsForVoting;