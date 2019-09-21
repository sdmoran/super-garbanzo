var PlayerStore = {
    players: [{name: "jeff", score: 0}],
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