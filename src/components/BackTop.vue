<template>
  <div @click="handleBack" ref="toBackEl" :class="{'back-praent': true, 'isShow': isShow}">
    <span class="back-child">☝</span>
  </div>
</template>

<script>
export default {
  name: "wr-backtop",
  computed: {
    isShow() {
      return this.$store.state.backIsShow
    },
  },
  methods: {
    // 一阶贝塞尔曲线方程
    onebsr(t, a1, a2) {
      return a1 + (a2 - a1) * t;
    },
    fn() {
      if(this.$store.state.from > 0){
        let ii = this.onebsr(100/document.body.scrollHeight, this.$store.state.from, 0)
        document.body.scrollTop = document.documentElement.scrollTop = ii;
        this.timer = requestAnimationFrame(this.fn);
      }else{
        cancelAnimationFrame(this.timer);
      }
    },
    handleBack() {
      requestAnimationFrame(this.fn)
    }
  },
  data() {
    return {
      timer: null
    };
  }
};
</script>

<style scoped>
.back-praent {
  position: fixed;
  bottom: 0;
  right: 5%;
  width: 6%;
  max-width: 35px;
  height: 50px;
  opacity: 0;
  z-index: -1;
  border: 1px dashed;
  border-radius: 20px 20px 0 0;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}
.back-praent:hover {
  box-shadow: 3px 3px 15px -5px #485b6e;
  animation: identifier 1s ease 0s 1;
}
.isShow {
  opacity: 1;
  z-index: 5;
}
.back-child {
  line-height: 45px;
}
@keyframes identifier {
  from {
    height: 50px;
    box-shadow: 3px 3px 15px -5px #2c3e50;
  }
  50% {
    height: 70px;
    box-shadow: 10px 3px 35px -5px #2c3e50;
  }
  to {
    height: 50px;
    box-shadow: 3px 3px 15px -5px #2c3e50;
  }
}
</style>