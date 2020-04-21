<template>
  <div class="container">
    <Nav></Nav>
    <div class="main">
      <router-view />
      <BackTop />
    </div>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop.vue';
import Nav from '@/components/Nav.vue';

export default {
  name: 'app-root',
  components: {
    BackTop,
    Nav
  },
  beforeCreate() {
    this.$store.dispatch('getNav');
  },
};
</script>

<style lang="stylus" scoped>

</style>
