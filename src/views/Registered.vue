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
  left: 0;right: 0;
  margin: 0 auto;
}
.sco-enter-active {
  animation: in-sco .5s ease forwards;
}

.sco-leave-active {
  animation: out-sco .5s forwards;
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
    transform: rotate(180deg);
    opacity: 0;
  }
}
</style>