<template>
  <div :class="{bar: true, bide: bide}">
    <router-link to="/" class="log" tooltip="别点，点就是首页" placement="bottom">💌</router-link>
    <div class="nav" v-show="barShrink">
      <router-link v-for="(item, index) in navSet" :key="index" :to="item.nav_path">{{item.nav_name}}</router-link>
    </div>
    <div class="attach">
      <input type="search" class="search" placeholder="当然你可以不搜..."  v-show="barShrink" />
    </div>
    <div class="attach">
      <span v-show="barShrink" class="btn" tooltip="分享" placement="bottom">📡</span>
      <span v-show="!barShrink" class="btn" @click="dropDown" tooltip="查看更多" placement="bottom">👀</span>
      <span v-show="barShrink" class="btn" tooltip="设置" placement="bottom">⚙</span>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'wr-nav',
    methods: {
      dropDown() {
        this.$store.commit({
          type: 'setIsDown',
          val: false,
        })
      },
    },
    // 3.0 获取多个状态，不必每个都生成计算属性
    computed: mapState({

      // 正如 vuex 教程中说的，箭头函数可使代码更简练
      navSet: state => state.nav,

      // 传字符串参数 'bide' 等同于 `state => state.bide`
      bide: 'backIsShow',
      barShrink: 'barShrink',
    })

    // 2.0 通过 API 获取导航，挂到 vuex
    // 计算属性取 store 值
    // computed: {
    //   navSet() {
    //     return this.$store.state.nav;
    //   },
    // },

    // 1.0 初始版本
    // data() {
    //   return {
    //     routes: [
    //       { name: '🎊 主页', path: '/' },
    //       { name: '📻 分类', path: '/typeOrTag' },
    //       { name: '🎟 友链', path: '/friendsLink' },
    //       { name: '🎏 关于', path: '/about' },
    //     ]
    //   }
    // }
  }
</script>