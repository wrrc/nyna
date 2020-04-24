<template>
  <div class="box">
    <div class="flipbox">
      <div class="side"></div>
      <div class="side">反面</div>
    </div>
    <!-- <div class="wave ripple danger"> -->
    <!-- <div class="circle"></div>
    <div class="circle"></div>-->
    <!-- <div class="circle"></div> -->
    <!-- <div class="content">
      <i class="fa fa-bell"></i>
    </div>-->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
/** 翻转动画取自 https://blog.csdn.net/bdss58/article/details/51728489 */
.flipbox {
  position: relative;
  width: 800px;
  height: 600px;
  perspective: 1000px;
}
.flipbox:hover .side:nth-child(1) {
  transform: rotateY(-180deg);
}
.flipbox:hover .side:nth-child(2) {
  transform: rotateY(0deg);
}
.side {
  width: inherit;
  height: inherit;
  border-radius: var(--br);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  box-shadow: var(--boxSha);
  transition: 0.6s ease;
}
.side:nth-child(1) {
  /* background-color: red; */
}
.side:nth-child(2) {
  position: absolute;
  /* background-color: green; */
  left: 0;
  top: 0;
  transform: rotateY(180deg);
}

.wave {
  position: relative;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 28px;
}

.wave .circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
}

/* 波纹效果 */
.wave.ripple .circle {
  width: calc(100% - 6px); /* 减去边框的大小 */
  height: calc(100% - 6px); /* 减去边框的大小 */
  border: 3px solid #fff;
}

.wave.ripple .circle:first-child {
  animation: circle-opacity 2s infinite;
}

.wave.ripple .circle:nth-child(2) {
  animation: circle-opacity 2s infinite;
  animation-delay: 0.3s;
}

.wave.ripple .circle:nth-child(3) {
  animation: circle-opacity 2s infinite;
  animation-delay: 0.6s;
}

.wave.ripple.danger {
  color: red;
}

.wave.ripple.danger .circle {
  border-color: red;
  background-color: red;
}

.wave.ripple.warning {
  color: orange;
}

.wave.ripple.warning .circle {
  border-color: orange;
}

/* 波动效果 */
.wave.solid .circle {
  width: 100%;
  height: 100%;
  background: #fff;
}

.wave.solid .circle:first-child {
  animation: circle-opacity 2s infinite;
}

.wave.solid.danger {
  color: red;
}

.wave.solid.danger .circle {
  background: red;
}

.wave.solid.warning {
  color: orange;
}

.wave.solid.warning .circle {
  background: orange;
}

@keyframes circle-opacity {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>