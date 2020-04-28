import Vue from 'vue';
import axios from './plugins/axios';
import App from './App.vue';
import Alert from './components/Alert.vue';
import router from './router';
import store from './store';
import './assets/blog-css.css';

Vue.config.productionTip = false;
Vue.component('wr-alert', Alert);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
