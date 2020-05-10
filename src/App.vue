<template>
  <div>
    <DropDown />
    <Nav isPosition="bottom" />
    <Alert style="position: fixed;left: 0;right: 0;" />
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
import Alert from './components/Alert.vue';

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
    const now = new Date().getHours();
    if (now > 19) {
      this.$store.commit('setNight');
    }
  },
  watch: {
    '$route' (to, from) {
      const arr = (a) => {
        let is = [];
        a.forEach(v => {
          if (v.path) {
            is.push(v.path);
            if (v.children) {
              is.push(...arr(v.children));
            }
          }
        });
        return Array.from(new Set(is));
      }
      const routes = arr(this.$router.options.routes);
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
  components: {
    BackTop,
    Nav,
    DropDown,
    Alert,
  },
}
</script>

<style scoped>

</style>
