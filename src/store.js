import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'default_name'
  },
  mutations: {
    setName(state, name) {
      state.name = name
    }
  },
  actions: {

  }
})
