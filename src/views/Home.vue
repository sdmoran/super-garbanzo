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
  </div>
</template>

<script>

const API = require('../../server/api');

export default {
  name: 'home',
  data: function() {
    return {
        playerName: "",
        succeeded: false,
        showInput: true,
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
  },
}
</script>
