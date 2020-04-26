<template>
  <div class="box output_box" ref="loopBack">
    <p class="h3 prints" ref="outHere"></p> <!-- {{writeText}} -->
  </div>
</template>

<script>
  export default {
    name: 'wr-outText',
    props: ['imgPath', 'msg'],
    data() {
      return {
        delay: 240,
        i: 0,
        le: this.msg.split(''),
        timer: null,
      }
    },
    mounted() {
      this.timer = this.handleWrite();
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      handleWrite() {
        return setInterval(() => {
          if (this.le.length > 0) {
            this.$refs.outHere.innerHTML += this.le[this.i];
            this.i++;
            if (this.i >= this.le.length) {
              // this.$refs.outHere.innerHTML = '';
              // this.i = 0;
              // let time = new Date().getTime(),
              //     timend;
              // do {
              //   timend = new Date().getTime();
              // } while (timend - time <= 3000);
              clearTimeout(this.timer);
            }
          }
        }, this.delay);
      },
    },
  }
</script>

<style scoped>
.output_box {
  /* height: 200px; */
  width: 90vw;
  height: 60vh;
  /* padding: .5rem; */
  background: url('../assets/img/背景1.png') center center no-repeat;
  background-size: cover;
  border-radius: 20px;
  animation: bc-drop .8s forwards;
  /* transition: all .3s ease; */
}

.prints::after{
  content: ' _';
  animation: glint 1s infinite;
}

@keyframes glint{
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}

.output_box p {
  /* transition: all .3s ease; */
  animation: text-animat 5s;
}

@keyframes text-animat {
  from {
    transform: translateX(-50%);
  }
  50% {
    transform: translateX(-25%);
  }
  to {
    transform: translateX(0);
  }
}
</style>