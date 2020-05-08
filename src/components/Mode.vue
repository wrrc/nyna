<template>
  <div class="mode">
    <div class="mode-dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wr-mode',
  }
</script>

<style scoped>
.mode {
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  z-index: 3000;
  background: rgba(241, 241, 240, .5);
  transition: background .5s ease-out;
}

.mode::before {
  content: "";
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  background: rgba(241, 241, 240, .3);
  filter: blur(5px);
}

.mode-dialog {
  position: absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  max-width: 500px;
  height: max-content;
  max-height: 60%;
  padding: 20px;
  margin: auto;
  border-radius: var(--br);
  background: rgba(255, 255, 255, .5);
  animation: bc-drop .6s forwards;
}
</style>