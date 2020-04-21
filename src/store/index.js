import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: null,
    count: 0,
    from: null,
    backIsShow: false,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setNav(state, v) {
      state.nav = v.val
    },
    // setFrom(s, v) {

    // },

    isScroll(s) {
      s.from = document.body.scrollTop || document.documentElement.scrollTop
      if (s.from > 100) {
        s.backIsShow = true;
      } else {
        s.backIsShow = false;
      }
    },
  },
  actions: {

    // 获取导航栏信息
    getNav({ commit }) {
      axios.get('/home').then(({ data }) => {
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

    // 添加滚动监听
    scrollSlideEvent({ commit }) {
      window.addEventListener('scroll', () => commit('isScroll'));
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
