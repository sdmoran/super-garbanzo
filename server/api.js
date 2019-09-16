// API to make calls to the server a little more manageable from Vue components and views.

const axios = require('axios')
const url = 'http://localhost:3000/'
const playerPath = 'players/'

// Make a GET request to server for the current list of players.
const getPlayers = function() {
    return axios.get(url + playerPath);
}

// Make a POST request to server with the given player name.
const postPlayer = function(name) {
    return axios.post(url + playerPath, {"name": name});
}

exports.getPlayers = getPlayers;
exports.postPlayer = postPlayer;