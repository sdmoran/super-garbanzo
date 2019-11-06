// API to make calls to the server a little more manageable from Vue components and views.

const axios = require('axios')
const port = process.env.VUE_APP_PORT || 8000;
const url = 'http://localhost:' + port
const playerPath = '/players'
const questionPath = '/questions'
const adminPath = '/admin'
const playPath = '/play'

// Make a GET request to server for the current list of players.
const getPlayers = function() {
    return axios.get(url + playerPath);
}

// Make a GET request to server for the questions assigned to given playername.
const getQuestions = function(name) {
    return axios.get(url + questionPath, {
        params: {
            "name": name,
        }
    });
}

// Make a GET request to server for the questions that have been answered.
const getAnsweredQuestions = function() {
    return axios.get(url + questionPath + '/answered');
}

// Make a POST request to server with the given player name.
const addPlayer = function(name) {
    return axios.post(url + playerPath, {"name": name});
}

// Make a POST request to server to add answers for the given questions.
const sendQuestions = function(name, questions) {
    return axios.post(url + questionPath, {"name": name, questions: questions})
}

// Make a GET request to the server to get the number of seconds left in voting period.
const getTime = function() {
    return axios.get(url + playPath + '/timeleft');
}

// Make a POST request to start the game.
const startGame = function() {
    return axios.post(url + adminPath + "/start");
}

exports.getQuestions = getQuestions;
exports.getPlayers = getPlayers;
exports.addPlayer = addPlayer;
exports.sendQuestions = sendQuestions;
exports.startGame = startGame;
exports.getAnsweredQuestions = getAnsweredQuestions;
exports.getTime = getTime;