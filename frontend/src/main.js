import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Store from "./store/index.js";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: router,
  store: Store,
})
  .$mount("#app");
