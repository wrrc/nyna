<template>
  <wr-mode>
    <transition name="sco">
      <router-view></router-view>
    </transition>
  </wr-mode>
</template>

<script>
  export default {
    name: 'wr-regist',
  }
</script>

<style scoped>
.sco-enter-active,
.sco-leave-active {
  will-change: transform;
  width: 100%;
  position: absolute;
  top: 0;right: 0;bottom: 0;left: 0;
  margin: 0 auto;
}
.sco-enter-active {
  transform-origin: bottom left;
  animation: in-sco .5s ease forwards;
}

.sco-leave-active {
  z-index: -1;
  transform-origin: bottom right;
  animation: out-sco .5s ease forwards;
}

@keyframes in-sco {
  from {
    transform: rotateZ(180deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
}

@keyframes out-sco {
  from {
    transform: rotateZ(0);
    opacity: 1;
  }
  to {
    transform: rotate(-180deg);
    opacity: 0;
  }
}
</style>