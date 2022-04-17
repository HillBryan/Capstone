import { createStore } from "vuex";

export default createStore({
  state: {
    account: {},
  },
  mutations: {
    UPDATE_ACCOUNT(state, account) {
      state.account = account;
    },
  },
  actions: {
    login(context, payload) {
      context.commit("UPDATE_ACCOUNT", payload);
    },
  },
});
