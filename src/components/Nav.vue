<template>
  <div :class="{bar: true, bide: bide}">
    <div class="nav">
      <router-link v-for="(item, index) in navSet" :key="index" class="btn" :to="item.nav_path">{{item.nav_name}}</router-link>
    </div>
    <div class="search">
      <input type="search" name="" id="" placeholder="当然你可以不搜..." />
    </div>
    <BackTop />
    <div class="share">
      <span tooltip="分享" placement="bottom">📡</span>
    </div>
  </div>
</template>

<script>
  // import BackTop from '@/components/BackTop.vue';
  import { mapState } from 'vuex';
  export default {
    name: 'wr-nav',

    // 3.0 获取多个状态，不必每个都生成计算属性
    computed: mapState({

      // 正如 vuex 教程中说的，箭头函数可使代码更简练
      navSet: state => state.nav,

      // 传字符串参数 'bide' 等同于 `state => state.bide`
      bide: 'backIsShow'
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