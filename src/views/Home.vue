<template>
  <div class="home">
    <h1>This is the home page.</h1>
    <div v-if="!submitted">
      <input name="textbox" v-model="playerName">
      <input class="submit" type="submit" v-on:click="sendPlayer()"> 
    </div>
    <p>{{msg}}</p>
  </div>
</template>

<script>

const API = require('../../server/api');

export default {
  name: 'home',
  data: function() {
    return {
        playerName: "",
        submitted: false,
        msg: "Type in a name and click submit!",
    }
  },
  methods: {
    sendPlayer() {
      this.submitted = true;
      this.msg = "Please wait...";
      return API.addPlayer(this.playerName)
        .then( () => {
          this.msg = "Successfully added player!";
        })
        .catch( () => {
          this.msg = "Failed to add player, try a different name."
          this.submitted = false;
        })
    },
  },
}
</script>
