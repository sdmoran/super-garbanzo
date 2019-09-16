// API to make calls to the server a little more manageable from Vue components and views.

const axios = require('axios')
const url = 'http://localhost:3000/'
const playerPath = 'players/'

// Make a get request to server for the current list of players.
const getPlayers = function() {
    return axios.get(url + playerPath);
}

const post = function(path="", data="") {
    return axios.post(url + path, )
}

exports.getPlayers = getPlayers;
exports.post = post;