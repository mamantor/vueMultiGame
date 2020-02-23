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
    }  
  },
  mutations: {
    gameState(state, newStateKey){
      for(const st in state.gameState){
        if(state.gameState[st] === true)
        state.gameState[st] = false
      }

      state.gameState[newStateKey] = true

    }
  },
  actions: {},
  modules: {}
});
