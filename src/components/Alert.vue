<template>
  <transition name="alert-top">
    <div v-for="(v, index) in info" :key="index" class="alert" :style="{ background: v.color === 0 ? 'skyblue' : v.color === 1 ? 'green' : v.color === 2 ? 'orange' : v.color === 3 ? 'lightcoral' : 'lightslategray' }">
      <span>{{ v.msg }}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'wr-alert',
    computed: {
      info() {
        return this.$store.state.alertInfo;
      },
    },
  }
</script>

<style scoped>
.alert {
  position: fixed;
  left: 0;right: 0;
  width: max-content; /* 30% */
  padding: .5em 1em;
  margin: 2em auto;
  text-align: center;
  border-radius: var(--br);
  opacity: .9;
  color: #fff;
  z-index: 3100;
}
</style>