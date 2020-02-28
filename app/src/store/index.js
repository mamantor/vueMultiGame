import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    gameState: {
      scoring : false,
      playing : false,
      idle : true,
      voting : false
    },
    socket: {},
    answers: {},
    users: [],
    answerCount: 0
  },
  mutations: {
    gameState(state, newStateKey){
      for(const st in state.gameState){
        if(state.gameState[st] === true)
          state.gameState[st] = false
      }

      state.gameState[newStateKey] = true

    },
    socketStore(state, socket) {
      console.log("I store the socket")
      state.socket = socket
    },
    userAnswer(state, data) {
      console.log(`user %s answered this : %s`, data.username, data.answer);
      state.answers[data.username] = data.answer;
      console.log(state.answers);
      state.answerCount++
      
    },
    newUser(state, username) {
      state.users.push(username)
    },
    userLeft(state, username) {
      state.users.splice(this.users.indexOf(username), 1)
    }

  },
  actions: {},
  modules: {}
});
