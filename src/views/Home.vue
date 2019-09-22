<template>
  <div class="home">
    <h1>This is the home page.</h1>
    <p>{{msg}}</p>
    <div v-if="showInput">
      <input name="textbox" v-model="playerName">
      <input class="submit" type="submit" v-on:click="sendPlayer()"> 
    </div>
    <div v-if="succeeded">
      <p>Your name: {{playerName}}</p>
    </div>
    <div v-if="isAdmin && succeeded">
      <button v-on:click="startGame()">START THE GAME</button>
    </div>
  </div>
</template>

<script>
const io = require('socket.io-client');
const API = require('../../server/api');

export default {
  name: 'home',
  data: function() {
    return {
        playerName: "",
        succeeded: false,
        showInput: true,
        isAdmin: true,
        socket: io('localhost:8000'),
        msg: "Type in a name and click submit!",
    }
  },
  methods: {
    sendPlayer() {
      this.showInput = false;
      this.msg = "Please wait...";
      return API.addPlayer(this.playerName)
        .then( () => {
          this.msg = "Successfully added player!";
          this.succeeded = true;
        })
        .catch( () => {
          this.msg = "Failed to add player, try a different name."
          this.showInput = true;
        })
    },
    startGame() {
      API.startGame();
    }
  },
  mounted() {
    this.socket.on('startGame', () => {
      this.$router.push('/play/');
    });
  }
}
</script>
