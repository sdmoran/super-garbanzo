var PlayerStore = {
    players: [],
    methods: {
        addPlayer: function(name) {
            // Check if there is already a player with the given name. If not, add the player.
            if(!players.some((p) => { p.name == name })) {
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