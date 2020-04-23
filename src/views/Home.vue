<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <OutText msg="简而言之，这是闻人若川写一些东西的地方..."/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <InArticle />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import OutText from '@/components/OutText'
import InArticle from '@/components/InArticle.vue';

export default {
  name: 'Home',

  components: {
    // HelloWorld,
    OutText,
    InArticle,
  }
};
</script>
