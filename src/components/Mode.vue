<template>
  <div :class="{ mode: check }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'wr-mode',
    computed: {
      check() {
        return this.$store.state.modeVisible
      },
    },
  }
</script>

<style scoped>
.mode {
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  z-index: 30;
  background: rgba(241, 241, 240, .5);
  transition: background .5s ease-out;
}
</style>