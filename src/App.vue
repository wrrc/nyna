<template>
  <div>
    <Nav />
    <div class="container">
      <div class="main">
        <router-view />
        <BackTop />
      </div>
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
    if (!this.$store.state.nav) {
      this.$store.dispatch('getNav');
    }
    this.$store.dispatch('scrollSlideEvent');
  }
};
</script>

<style lang="stylus" scoped>

</style>
