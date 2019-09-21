<template>
  <div class="showplayers">
    <h1>This is the page with a list of players.</h1>
    <ul>
        <li v-for="player in players" :key="player.name">{{player.name}}</li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client';

const API = require('../../../server/api');

export default {
  name: 'showplayers',
  data: function() {
    return {
        msg: "Hello!",
        socket: io('localhost:8000'),
        players: [],
    }
  },
  methods: {
    refresh: function() {
          API.getPlayers().then( (res) => {
          console.log(res.data);
          this.players = res.data;
      });
    }
  },
  components: {
    
  },
  mounted() {
    this.refresh();
    this.socket.on('playerAdded', () => {
      this.refresh();
    });
  },
}
</script>
