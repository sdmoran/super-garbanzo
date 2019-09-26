import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'default_name',
    socket: io('localhost:8000'),
  },
  mutations: {
    setName(state, name) {
      state.name = name
    }
  },
  actions: {

  }
})
