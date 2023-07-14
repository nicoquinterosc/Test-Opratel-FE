import Vue from 'vue';
import App from './App.vue';
import router from './routers';
import VueRouter from 'vue-router';
import './axios';
import store from './vuex';
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel';

Vue.use(VueRouter);
Vue.use(VueCollapsiblePanel);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');