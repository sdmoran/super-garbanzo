const express = require('express');
const app = express();
// Run backend server on VUE_APP_PORT if specified, default 8000.
const port = process.env.VUE_APP_PORT || 8000;

// Include PlayerStore and QuestionStore
const PlayerStore = require('./PlayerStore');
const QuestionStore = require('./QuestionStore');


const bodyParser = require('body-parser');
app.use(bodyParser.json());

QuestionStore.loadQuestions(8);

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

// POST request for /players/ URL. Adds a player to player list (if valid) and emits 'playerAdded,' telling the ShowPlayers view
// to fetch updated data from the server. 
app.post('/players/', (req, res) => {
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
})

// Starts server
const server = app.listen(port, () => {
    console.log('NODE_ENV: ' + process.env.NODE_ENV)
    console.log('Server listening on port %s', port)
});

// Initializes socketio
const io = require('socket.io')(server);

exports.app = app;