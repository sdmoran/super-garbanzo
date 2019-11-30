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

// Starts server
const server = app.listen(port, () => {
    console.log('NODE_ENV: ' + process.env.NODE_ENV)
    console.log('Server listening on port %s', port)
});

// Initializes socketio
const io = require('socket.io')(server);

// Keep track of whether or not the game has been started!
let started = false;
const countdown_seconds = 10;
let seconds_left = 10;

// Function to countdown time players have to answer questions.
// Counts down from the number of seconds player have to 0, emitting tickDown
// event every time it ticks down and a timeUp event when it reaches 0. Also
// emits msg, which serves to advance the game state. Finally, calls callback fn.
function countdown() {
    seconds_left = countdown_seconds;
    return new Promise((resolve, reject) => {
        // Countdown logic
        // Number of seconds that countdown will take
        let intervalID = setInterval(function() {
            if(seconds_left > 0) {
                seconds_left--;
                io.emit('tickDown', seconds_left);
            }
            else {
                io.emit('timeUp', 0);
                clearInterval(intervalID);
                // Add a small delay - it seems a bit silly, but it's kind of jarring to jump DIRECTLY from answering to voting.
                // Experience is nicer with a second or two to relax in between.
                setTimeout(function() {
                    resolve("Countdown finished");
                }, 2000);
            }
        }, 1000);
    })
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
                // Start countdown for voting stage. Wacky Javascript quirkiness means countdown
                // can't directly called with parameters.
                countdown().then(() => handleVoting());
                res.send('Game starting...');
            }
        )
    }
    else {
        res.status(420);
        res.send("Game already started!");
    }
})

app.post('/vote/', (req, res) => {
    console.log("New score: " + QuestionStore.vote(req.body.question));
    res.send('Received vote!')
})

// Handle logic for voting, send 2 questions at a time
function handleVoting() {
    io.emit('vote');

    let orderedQuestions = QuestionStore.orderQuestionsForVoting();
    // sendCurrentQuestions(orderedQuestions, 0);
    i = orderedQuestions.length / 2;
    function voteLoop (i) {
        if(i > orderedQuestions.length / 2 - 1) {
            return;
        }
        else {
            sendCurrentQuestions(orderedQuestions, i);
            countdown().then(() => {
                voteLoop(i + 1)
            })
        }
    }
    voteLoop(0);
}

// 
function sendCurrentQuestions(orderedQuestions, i) {
    let currentQuestions = [orderedQuestions[i * 2], orderedQuestions[i * 2 + 1]];
    console.log("Current questions: " + currentQuestions);
    io.emit('questionPair', currentQuestions);
}


// When game starts...
// - Answer questions for 10 seconds
// - Loop through pairs of questions, vote on each

exports.app = app;