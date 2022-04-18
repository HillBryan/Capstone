import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const state = {
  account: {},
};

const getters = {
  account: (state) => state.account,
};

const actions = {
  async setAccount({ commit }, account) {
    commit("setAccount", account);
  },
};

const mutations = {
  setAccount: (state, account) => (state.account = account),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
