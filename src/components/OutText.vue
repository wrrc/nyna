<template>
  <div class="output_box">
    <p class="h3 prints">{{writeText}}</p>
  </div>
</template>

<script>
  export default {
    name: 'wr-outText',
    props: ['msg'],
    data() {
      return {
        writeText: '',
        delay: 300,
        i: 1,
      }
    },
    mounted() {
      this.handleWrite();
    },
    methods: {
      handleWrite() {
        this.writeText = this.msg.slice(0, this.i++);
        if (this.i > this.msg.length) {
          this.i = 0;
          setTimeout(this.handleWrite, this.delay);
        }else {
          setTimeout(this.handleWrite, this.delay);
        }
      },
    },
  }
</script>

<style scoped>
.output_box {
  height: 200px;
  padding: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s ease;
}
</style>