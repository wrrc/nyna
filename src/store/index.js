import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: null,
    count: 0,
    from: null,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setNav(state, v) {
      state.nav = v.val
    },
    setFrom(s, v) {
      s.from = v
    }
  },
  actions: {
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
    increment(context) {

      // 载荷方式分发
      context.commit('incement')
    },
  },
  modules: {
  }
})
