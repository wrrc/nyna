<template>
  <div class="box">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="box output_box">
      <OutText v-for="(v,index) in loopImg" :key="index" :msg="v.text" />
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <InArticle /> -->
    <div class="content" :style="{'flex-direction': this.barShrink ? 'row' : 'column'}">
      <InArticle />
      <Tags />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OutText from '@/components/OutText'
import InArticle from '@/components/InArticle.vue';
import Tags from '@/components/Tags.vue'

export default {
  name: 'Home',
  data() {
    return {
      loopImg: [
        {
          path: '../assets/img/背景1.jpg',
          text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        },
        // {
        //   path: '../assets/img/背景2.jpg',
        //   text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        // },
        // {
        //   path: '../assets/img/背景3.jpg',
        //   text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        // },
        // {
        //   path: '../assets/img/背景4.jpg',
        //   text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        // },
      ]
    }
  },
  components: {
    // HelloWorld,
    OutText,
    InArticle,
    Tags,
  },
  computed: {
    barShrink() {
      return this.$store.state.barShrink;
    }
  }
};
</script>

<style scoped>
.output_box {
  width: 85vw;
  height: 60vh;
  padding: 0;
  background: url('../assets/img/背景1.png') center center no-repeat;
  background-size: cover;
  border-radius: 20px;
  animation: bc-drop .8s forwards;
  /* transition: all .3s ease; */
}

.content {
  width: 85%;
  display: flex;
  margin: 3rem 0;
}
</style>
