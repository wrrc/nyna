import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 分离 api
// import BlogApi from './api/blog-api';
import axios from './plugins/axios';

// 一个遮罩层
import Mode from './components/Mode.vue';

// md 编辑器
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

// css 文件
import './assets/blog-css.css';

Vue.use(mavonEditor);
Vue.config.productionTip = false;
// Vue.prototype.$api = BlogApi;
Vue.component('wr-mode', Mode);

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm;
