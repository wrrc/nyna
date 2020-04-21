<template>
  <div>
    <div class="nav">
      <router-link v-for="(item, index) in navSet" :key="index" class="btn" :to="item.nav_path">{{item.nav_name}}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wr-nav',
    computed: {
      navSet() {
        return this.$store.state.nav;
      },
    },
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