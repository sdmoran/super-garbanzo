var PlayerStore = {
    players: [],
    methods: {
        addPlayer: function(name) {
            // Check if there is already a player with the given name. If not, add the player.
            if(!PlayerStore.players.some((p) => { return p.name == name }) && PlayerStore.players.length <= 8) {
                PlayerStore.players.push(createPlayer(name));
                return true;
            }
            else {
                return false;
            }
        },
        getPlayers: function() {
            return PlayerStore.players;
        },
        updateAllScores: function(questions) {
            return new Promise((resolve, reject) => {
                try {
                    for(let q = 0; q < questions.length; q++) {
                        // Add the length of Votes array to each corresponding player score for each question.
                        PlayerStore.methods.updatePlayerScore(questions[q].player, questions[q].votes.length);
                    }
                    resolve(PlayerStore.players);
                } catch(err) {
                    reject("An error occured in updateAllScores!");
                }
            })
        },
        updatePlayerScore: function(player, score) {
            for(let p = 0; p < PlayerStore.players.length; p++) {
                if(PlayerStore.players[p].name == player) {
                    PlayerStore.players[p].score += score;
                }
            }
        }
    }
}

function createPlayer(name) {
    return {
        name: name,
        score: 0
    }
}

exports.PlayerStore = PlayerStore;
exports.addPlayer = PlayerStore.methods.addPlayer;
exports.getPlayers = PlayerStore.methods.getPlayers;
exports.updateAllScores = PlayerStore.methods.updateAllScores;