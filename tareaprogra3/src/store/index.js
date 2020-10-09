import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token: '',
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload
    }
  },
  actions: {
    SET_TOKEN1: ({commit, state}, payload) => {
     commit('SET_TOKEN', payload);
     alert(payload);
    }
  },
  modules: {
  },
  getters: {
    token: state => state.token
  }
})
