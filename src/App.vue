<template>
  <div id="app">
    <div id="nav">
      <h2>Super Garbanzo</h2>
    </div>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const API = require('../server/api');

  export default {
    mounted() {
      // When the game starts, query the server with client's playername to get the relevant questions.
      this.$store.state.socket.on('startGame', () => {
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
    
      // When the client receives the startGame signal, change the route to the Play view.
      this.$store.state.socket.on('startGame', () => {
        this.$router.push('/play/');
      });

      // When the client receives the vote signal, change the route to the Vote view.
      this.$store.state.socket.on('vote', () => {
        this.$router.push('/vote/');
      });

      // When the client receives the scores signal, change the route to the Vote view.
      this.$store.state.socket.on('scoreboard', () => {
        this.$router.push('/scoreboard/');
      });
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
