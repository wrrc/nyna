import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: null,
    count: 0,
    from: 0,
    inWidth: window.innerWidth,
    backIsShow: false,
    barShrink: false,
    isDown: true,
    modeVisible: false,
    sonOrNight: '🌞',
    switchNight: false,
    alertInfo: [],
    token: '',
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
