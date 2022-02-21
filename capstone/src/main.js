import Vue from 'vue';
import App from './App.vue';
import Routes from './routes.js';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app');
