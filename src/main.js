import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Mode from './components/Mode.vue';

import axios from './plugins/axios';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import './assets/blog-css.css';

Vue.use(mavonEditor);
Vue.config.productionTip = false;
Vue.component('wr-mode', Mode);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
