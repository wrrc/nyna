<template>
  <div style="height: 1000px;">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <InArticle />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import InArticle from '@/components/inArticle.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    InArticle
  }
};
</script>
