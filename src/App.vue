<template>
  <div id="app">
    <div id="nav">
      <h2>Super Garbanzo</h2>
    </div>
    <router-view/>
  </div>
</template>

<script>
const API = require('../server/api');

  export default {
    mounted() {
      // When the game starts, query the server with client's playername to get the relevant questions.
      this.$store.state.socket.on('startGame', () => {
        console.log("App knows that game is started and will call getQuestions!");
        API.getQuestions(this.$store.state.name).then((resp) => {
          console.log("Received response: ", resp);
          var questions = [];
          for(var i = 0; i < resp.data.length; i++) {
            questions.push(resp.data[i].question);
          }
          this.$store.commit('setQuestions', questions);
        });
      }
      );
    }
  }
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
