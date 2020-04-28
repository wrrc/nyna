<template>
  <transition name="alert-top">
    <div v-for="(v, index) in info" :key="index" class="alert" :style="{ background: v.color === 0 ? 'skyblue' : v.color === 1 ? 'green' : v.color === 2 ? 'orange' : v.color === 3 ? 'lightcoral' : 'lightslategray' }">
      <span>{{v.msg}}</span>
      <!-- <i @click='close' style="position:absolute;right: 1em;cursor:pointer">✖</i> -->
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'wr-alert',
    props: ['data', 'isShow'],
    // data() {
    //   return {
    //     info: [],
    //   }
    // },
    computed: {
      // color() {
      //   const c = ;
      //   return c;
      // },
      info() {
        return this.$store.state.alertInfo;
      },
    },
    /* methods: {
      close() {
        //子组件向父组件发射事件
        // this.$emit('close');
        //关闭消息框
        // this.isShow = false;
      }
    }, */
  }
</script>

<style scoped>
.alert {
  width: 30%;
  position: relative;
  padding: .5em 1em;
  margin: 2em auto;
  text-align: center;
  border-radius: var(--br);
  /* background: orange; */
  opacity: .8;
  color: #fff;
  z-index: 60;
}
</style>