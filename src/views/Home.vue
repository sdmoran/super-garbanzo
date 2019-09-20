<template>
  <div class="home">
    <h1>This is the home page.</h1>
    <input v-model="playerName">
    <input type="submit" v-on:click="sendPlayer()"> 
    <p>{{msg}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

const API = require('../../server/api');

export default {
  name: 'home',
  data: function() {
    return {
        playerName: "",
        msg: "Type in a name and click submit!",
    }
  },
  methods: {
    sendPlayer() {
      API.addPlayer(this.playerName)
      .then( () => {
        this.msg = "Successfully added player!";
      })
      .catch( () => {
        this.msg = "Failed to add player, try a different name."
      });
    }
  },
  components: {

  },
}
</script>
