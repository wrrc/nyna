<template>
  <transition-group name="alert-top">
    <!-- <div class="alerts" key="info"> -->
      <div v-for="(v, index) in info" class="alert" :key="index" :style="{ background: v.color === 0 ? 'skyblue' : v.color === 1 ? 'green' : v.color === 2 ? 'orange' : v.color === 3 ? 'lightcoral' : 'lightslategray' }">
        <span>{{ v.msg }}</span>
      </div>
    <!-- </div> -->
  </transition-group>
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
.alerts {
  position: fixed;
  left: 0;right: 0;
  display: flex;
  flex-flow: column nowrap;
}

.alert {
  width: max-content; /* 30% */
  padding: .5em 1em;
  margin: .5em auto;
  text-align: center;
  border-radius: var(--br);
  opacity: 1;
  color: #fff;
  z-index: 3100;
}
</style>