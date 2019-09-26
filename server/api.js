// API to make calls to the server a little more manageable from Vue components and views.

const axios = require('axios')
const port = process.env.VUE_APP_PORT || 8000;
const url = 'http://localhost:' + port
const playerPath = '/players'
const questionPath = '/questions'
const adminPath = '/admin'

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

// Make a POST request to server with the given player name.
const addPlayer = function(name) {
    return axios.post(url + playerPath, {"name": name});
}

const get = function() {
    return axios.get(url);
}

const startGame = function() {
    return axios.post(url + adminPath + "/start");
}

exports.getQuestions = getQuestions;
exports.getPlayers = getPlayers;
exports.addPlayer = addPlayer;
exports.startGame = startGame;
exports.get = get;