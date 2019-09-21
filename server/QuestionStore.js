const QuestionDAO = require('./QuestionDAO');

var QuestionStore = {
    questions: [],
    methods: {
        // Uses QuestionDAO to load questions from database into the questions array.
        loadQuestions(num) {
            // Only fetch questions if the array is empty.
            if(QuestionStore.questions.length === 0) {
                QuestionDAO.randomQuestions(num)
                .then((rows) => {
                    for(let i = 0; i < rows.length; i++) {
                        QuestionStore.questions.push(rows[i].questiontext);
                    }
                    console.log("Questions loaded: ");
                    console.log(QuestionStore.questions);
                })
                .catch((err) => {
                    console.log("An error occured!!!");
                })
            }
        }
    },
}

exports.loadQuestions = QuestionStore.methods.loadQuestions;