import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: null,                    // 导航信息
    count: 0,                     // 官方示例
    from: 0,                      // 页面滚动
    inWidth: window.innerWidth,   // 页面宽度
    backIsShow: false,            // 回到顶部
    barShrink: false,             // 顶栏响应式
    isDown: true,                 // 侧栏
    // modeVisible: false,
    sonOrNight: '🌞',             // 夜间模式切换表情
    switchNight: false,           // 侧栏开启夜间模式
    alertInfo: [],                // 弹窗信息
    token: '',                    // 用户 token
    addTagMode: false,            // 增加标签的模态
    tags: JSON.parse(sessionStorage.getItem('tags')) || [],                     // 标签
    classes: JSON.parse(sessionStorage.getItem('classes')) || [], // 标签的分类信息
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setNav(state, v) {
      state.nav = v.val;
      sessionStorage.setItem('navs', JSON.stringify(state.nav));
    },
    setNavInSeeeion(s, v) {
      s.nav = v;
    },
    isScroll(s) {
      s.from = document.body.scrollTop || document.documentElement.scrollTop;
      s.backIsShow = s.from > 100 ? true : false;
    },
    isInnerW(s) {
      s.inWidth = window.innerWidth;
      s.barShrink = s.inWidth >= 670 ? true : false;
    },
    setIsDown(s, v) {
      s.isDown = v.val;
    },
    setModeVisible(s) {
      s.modeVisible = !s.modeVisible;
    },
    setNight(s) {
      if (s.sonOrNight === '🌞') {
        s.switchNight = true;
        s.sonOrNight = '🌙';
        document.documentElement.style.setProperty('--bcl', '#171d20');
        document.documentElement.style.setProperty('--bcw', '#2C3E50');
        document.documentElement.style.setProperty('--bcb', 'ghostwhite');
        document.documentElement.style.setProperty('--bcy', '#2C3E50');
      } else {
        s.switchNight = false;
        s.sonOrNight = '🌞';
        document.documentElement.style.setProperty('--bcl', 'ghostwhite');
        document.documentElement.style.setProperty('--bcw', '#fff');
        document.documentElement.style.setProperty('--bcb', '#2C3E50');
        document.documentElement.style.setProperty('--bcy', '#f9f9f9');
      }
    },
    setAlertInfo(s, v) {
      s.alertInfo.shift();
      s.alertInfo.push(v);
      setTimeout(() => {
        s.alertInfo.shift();
      }, 3000);
    },
    setToken(s, v) {
      s.token = v;
    },
    setAddTagMode(s) {
      s.addTagMode = !s.addTagMode;
    },
    setTags(s, v) {
      s.tags = v;
    },
    setClasses(s, v) {
      s.classes = v;
    }
  },
  actions: {

    // 获取导航栏信息
    getNav({ commit }) {
      axios.get('/nav').then((data) => {
        if (data.code === 100) {
          // 对象方式分发
          commit({
            type: 'setNav',
            val: data.dataSet
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    // 添加滚动及页面宽度监听
    scrollSlideEvent({ commit }) {
      window.addEventListener('scroll', () => commit('isScroll'));
      window.addEventListener('resize', () => commit('isInnerW'));
    },

    // vue 官方示例
    increment(context) {

      // 载荷方式分发
      context.commit('incement')
    },
  },
  modules: {
  }
})
