const express = require('express');
const app = express();
// Run backend server on VUE_APP_PORT if specified, default 8000.
const port = process.env.VUE_APP_PORT || 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// This is code to load questions into database. Should ONLY ever need to be run when setting up database.
// const QuestionDAO = require('./QuestionDAO');
// QuestionDAO.addQuestionsToDB();


// Include PlayerStore and QuestionStore
const PlayerStore = require('./PlayerStore');
const QuestionStore = require('./QuestionStore');


// Keep track of whether or not the game has been started!
let started = false;
const seconds_to_answer = 10;
let seconds_left = seconds_to_answer;
let intervalID = null;    // The ID of the interval we ultimately want to clear

// Function to countdown time players have to answer questions.
// Counts down from the number of seconds player have to 0, emitting tickDown
// event every time it ticks down and a timeUp event when it reaches 0.
const countdown = function () {
    console.log(seconds_left);
    if(seconds_left > 0) {
        seconds_left--;
        io.emit('tickDown', seconds_left);
    }
    else {
        io.emit('timeUp', 0);
        io.emit('vote');
        clearInterval(intervalID);
    }
}

// Set up headers for server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// GET request for base URL, just to check that server is running.
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET request for /players/ URL, responds with list of players in game.
app.get('/players/', (req, res) => {
    res.send(PlayerStore.getPlayers());
})

// GET request for /questions/ URL, responds with list of questions assigned to the given playername.
app.get('/questions/', (req, res) => {
    const name = req.query.name;
    console.log("Questions assigned to %s: ", req.query.name);
    console.log(QuestionStore.getQuestions(name));
    res.send(QuestionStore.getQuestions(name));
})

// GET request for /questions/answered/ URL, responds with list of questions that have been answered.
app.get('/questions/answered/', (req, res) => {
    var answered = QuestionStore.getQuestions().filter( (q) => {
        return q.answer !== null;
    });
    console.log("Answered questions: ", answered);

    res.send(answered);
})

// GET request for /play/timeleft/ URL, responds with number of seconds left in the voting period.
app.get('/play/timeleft/', (req, res) => {
    res.send({'seconds_left': seconds_left});
})

// POST request for /players/ URL. Adds a player to player list (if valid) and emits 'playerAdded,' telling the ShowPlayers view
// to fetch updated data from the server. 
app.post('/players/', (req, res) => {
    if(!started) {
        const name = req.body.name;
        if(PlayerStore.addPlayer(name)) {
            console.log(PlayerStore.getPlayers());
            io.emit('playerAdded', name);
            res.send("Added player!");
        }
        else {
            res.status(409);
            res.send("Failed to add player!");
        }
    }
    else {
        res.status(420);
        res.send("Can't add player, game already underway!")
    }
})

// POST request for /questions/ URL. Adds answers to the questions associated with the given
// playername and questions.
app.post('/questions/', (req, res) => {
    QuestionStore.answerQuestions(req.body.name, req.body.questions);
    console.log("Questions received!");
    console.log(QuestionStore.getQuestions());
    io.emit('questionsAnswered');
    res.status(200);
    res.send("Successfully added questions!");
})

// POST request to start the game.
app.post('/admin/start', (req, res) => {
    if(!started) {
        // Make sure we assign questions before we start the game!
        QuestionStore.assignPlayers(PlayerStore.getPlayers()).then(() =>
            {
                started = true;
                io.emit('startGame');
                console.log('Game starting...');
                // Start countdown!
                intervalID = setInterval(countdown, 1000);
                res.send('Game starting...');
            }
        )
    }
    else {
        res.status(420);
        res.send("Game already started!");
    }
})

// Starts server
const server = app.listen(port, () => {
    console.log('NODE_ENV: ' + process.env.NODE_ENV)
    console.log('Server listening on port %s', port)
});

// Initializes socketio
const io = require('socket.io')(server);

exports.app = app;