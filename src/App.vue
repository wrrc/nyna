<template>
  <div>
    <DropDown />
    <Nav isPosition="bottom" />
    <wr-alert></wr-alert>
    <!-- <div class="container"> -->
      <transition :name="transitionName">
        <router-view />
      </transition>
    <!-- </div> -->
    <BackTop />
  </div>
</template>

<script>
import DropDown from '@/components/DropDown.vue';
import BackTop from '@/components/BackTop.vue';
import Nav from '@/components/Nav.vue';

export default {
  name: 'app-root',
  beforeCreate() {
    const navs = JSON.parse(sessionStorage.getItem('navs'));
    if (navs) {
      this.$store.commit('setNavInSeeeion', navs);
    } else {
      this.$store.dispatch('getNav');
    }
    this.$store.dispatch('scrollSlideEvent');
    this.$store.commit('isInnerW');
    const token = sessionStorage.getItem('userToken');
    this.$store.commit('setToken', token);
  },
  watch: {
    '$route' (to, from) {
      let routes = this.navSet;
      routes.unshift('/');
      const toDepth = routes.indexOf(to.path);
      const fromDepth = routes.indexOf(from.path);
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  computed: {
    navSet() {
      return this.$store.state.nav.map(v => {
        return v.nav_path
      });
    },
  },
  components: {
    BackTop,
    Nav,
    DropDown,
  },
}
</script>

<style scoped>

</style>
