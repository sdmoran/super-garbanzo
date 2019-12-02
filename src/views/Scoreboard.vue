<template>
  <div class="scoreboard">
    <h1>This is the Scores view!</h1>
    <h2>Players</h2>
    <h4 v-for="p in players" :key="p.name">{{p.name}}: {{p.score}} </h4>
  </div>
</template>

<script>
const API = require('../../server/api');

export default {
      name: "Scoreboard",
      data: function() {
        return {
          players: [{name: 'Jeff', score: 1000}, {name: 'Jimbo', score: 100}]
        }
      },
      methods: {

      },
      mounted() {
        API.getPlayers().then((players) => {
          this.players = players.data;
        })
        // When a scores are updated, refresh the list
        this.$store.state.socket.on('scoresUpdated', () => {
          API.getPlayers().then((players) => {
            this.players = players.data;
          })
        });
      }
}
</script>