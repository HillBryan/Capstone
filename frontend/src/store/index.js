import Vue from 'vue'
import Vuex from 'vuex'
import accountModule from './accountModule'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    accountModule
  }
});

Vue.prototype.$store = store;

export default store;