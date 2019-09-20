<template>
  <div class="showplayers">
    <h1>This is the page with a list of players.</h1>
    <ul>
        <li v-for="player in players" :key="player.name">{{player.name}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

const API = require('../../../server/api');

export default {
  name: 'showplayers',
  data: function() {
    return {
        msg: "hello!",
        players: [
            {name: "jembo"},
            {name: "Joffermy"},
        ],
    }
  },
  components: {
    
  },
  mounted() {
      API.getPlayers().then( (res) => {
          console.log(res.data);
      })
  },
}
</script>
