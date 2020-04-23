<template>
  <div>
    <DropDown />
    <Nav />
    <div class="container">
      <div class="main">
        <transition :name="transitionName">
          <router-view />
        </transition>
        <BackTop />
      </div>
    </div>

  </div>
</template>

<script>
import DropDown from '@/components/DropDown.vue';
import BackTop from '@/components/BackTop.vue';
import Nav from '@/components/Nav.vue';

export default {
  name: 'app-root',
  beforeCreate() {
    if (!this.$store.state.nav) {
      this.$store.dispatch('getNav');
    }
    this.$store.dispatch('scrollSlideEvent');
    this.$store.commit('isInnerW')
  },
  watch: {
    '$route' (to, from) {console.log(to.path);
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  components: {
    BackTop,
    Nav,
    DropDown,
  },
}
</script>

<style lang="stylus" scoped>

</style>
