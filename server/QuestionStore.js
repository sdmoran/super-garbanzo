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
                            QuestionStore.questions.push({player: null, question: rows[i].questiontext});
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
        getQuestions() {
            return QuestionStore.questions;
        },
        assignPlayers(players) {
            for(let i = 0; i < players.length; i++) {
                QuestionStore.questions[i * 2].player = players[0].name;
                QuestionStore.questions[i * 2 + 1].plaer = players[0].name;
            }
        }
    },
}

exports.loadQuestions = QuestionStore.methods.loadQuestions;
exports.getQuestions = QuestionStore.methods.getQuestions;
exports.assignPlayers = QuestionStore.methods.assignPlayers;