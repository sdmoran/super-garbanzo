// API to make calls to the server a little more manageable from Vue components and views.

const axios = require('axios')
const port = process.env.VUE_APP_PORT || 8000;
const url = 'http://localhost:' + port
const playerPath = '/players/'

// Make a GET request to server for the current list of players.
const getPlayers = function() {
    return axios.get(url + playerPath);
}

// Make a POST request to server with the given player name.
const addPlayer = function(name) {
    return axios.post(url + playerPath, {"name": name});
}

const get = function() {
    return axios.get(url);
}

exports.getPlayers = getPlayers;
exports.addPlayer = addPlayer;
exports.get = get;