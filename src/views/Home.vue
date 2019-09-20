<template>
  <div class="home">
    <h1>This is the home page.</h1>
    <input v-model="msg">
    <p>{{msg}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data: function() {
    return {
        msg: "hello!",
    }
  },
  components: {
    
  },
}
</script>
