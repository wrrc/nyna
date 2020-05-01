<template>
  <div class="content-right">
    <p class="h5 leading-symbol">标签</p>
    <div class="summarys">
      <span class="summary">JavaScript</span>
      <span class="summary">node.js</span>
      <span class="summary">egg.js</span>
      <span class="summary">ECMA5/6</span>
      <span class="summary">Vue 全家桶</span>
      <span class="summary">React</span>
      <span class="summary">React Native</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wr-tags',
  }
</script>

<style scoped>
.content-right {
  width: max-content;
}
.summarys {
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  padding: 6px 12px;
  border-radius: var(--br);
  background-color: var(--bcw);
  box-shadow: var(--boxSha);
}

.summary {
  padding: 6px 12px;
  margin: .5rem;
  color: var(--bcw);
  background-color: var(--bcb);
  border-radius: 5px;
  font-size: x-small;
  cursor: pointer;
}

.flag {
  position: relative;
  margin: 0 .8rem;;
  transition: all .3s ease;
}

.flag > span {
  display: inline-block;
  min-width: .8rem;
  height: .8rem;
  padding: .3rem;
  color: var(--bcb);
  /* border-radius: var(--br); */
  /* background-color: rgba(44, 62, 80, 0.2); */
}
</style>