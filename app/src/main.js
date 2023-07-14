import Vue from 'vue';
import App from './App.vue';
import router from './routers';
import VueRouter from 'vue-router';
import './axios';
import store from './vuex';

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');