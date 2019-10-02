import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'default_name',
    socket: io('localhost:8000'),
    questions: [],
    index: 0,
  },
  getters: {
    // True if the player has not answered all questions, false otherwise
    moreQuestions: state => {
      console.log("Index: ", state.index)
      console.log("L: ", state.questions.length)
      return (state.index < state.questions.length)
    }
  },
  mutations: {
    setName(state, name) {
      state.name = name
    },
    setQuestions(state, questions) {
      for(var i = 0; i < questions.length; i++) {
        state.questions.push({question: questions[i], answer: null})
      }
    },
    incrementQuestion(state) {
      state.index++
    },
    answer(state, answer) {
      state.questions[this.state.index].answer = answer;
    }
  },
  actions: {

  }
})
