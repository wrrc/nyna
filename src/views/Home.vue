<template>
  <div class="box">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="box output_box">
      <OutText v-for="(v,index) in loopImg" :key="index" :msg="v.text" />
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <InArticle /> -->
    <div class="content" :style="{'flex-direction': this.barShrink ? 'row' : 'column'}">
      <div class="content-left">
        <p class="h5 leading-symbol">全部文章</p>
        <div class="article-warp">
          <section class="card">
            <div class="card-header">
              <p>
                <cite class="title">关于用 Vue 搭建博客</cite>
              </p>
              2020-04-21
            </div>
            <article class="card-body">
              这个东西不太好弄啊，，，，，气死个人，边做边想，要是有设计稿就好惹 (∪.∪ )...zzz
，气死个人，边做边想，要是有设计稿就好惹 (∪.∪ )...zzz
            </article>
            <div class="card-footer">
              <div class="flags">
                <button class="btn flag" tooltip="查看详情" placement="bottom">
                  🔬
                  <span>5</span>
                </button>
                <button class="btn flag">
                  ❤
                  <span>51</span>
                </button>
                <button class="btn flag">
                  ✒
                  <span>511</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="content-right">
        <p class="h5 leading-symbol">标签</p>
        <div class="summarys">
          <span class="summary">嘿嘿</span>
          <span class="summary">哈哈</span>
          <span class="summary">哈哈</span>
          <span class="summary">哈哈</span>
          <span class="summary">哈哈</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import OutText from '@/components/OutText'
import InArticle from '@/components/InArticle.vue';

export default {
  name: 'Home',
  data() {
    return {
      loopImg: [
        {
          path: '../assets/img/背景1.jpg',
          text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        },
        // {
        //   path: '../assets/img/背景2.jpg',
        //   text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        // },
        // {
        //   path: '../assets/img/背景3.jpg',
        //   text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        // },
        // {
        //   path: '../assets/img/背景4.jpg',
        //   text: '简而言之，这是闻人若川写一些东西的地方(～￣▽￣)～',
        // },
      ]
    }
  },
  components: {
    // HelloWorld,
    OutText,
    InArticle,
  },
  computed: {
    barShrink() {
      return this.$store.state.barShrink;
    }
  }
};
</script>

<style scoped>
.output_box {
  width: 90vw;
  height: 60vh;
  padding: 0 1rem;
  background: url('../assets/img/背景1.png') center center no-repeat;
  background-size: cover;
  border-radius: 20px;
  animation: bc-drop .8s forwards;
  /* transition: all .3s ease; */
}

.content {
  width: 90%;
  display: flex;
  /* justify-content: space-around; */
  margin: 3rem 0;
}

.content-left {
  width: 80%;
  margin-right: 30px;
  margin-bottom: 30px;
}

.article-warp {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.content-right {
  width: max-content;
}

.leading-symbol {
  margin-bottom: 1rem;
}

.leading-symbol:before {
  content: "";
  margin-right: 10px;
  border-right: 5px solid rgba(44, 62, 80, 0.3);
  /* color: blueviolet; */
}

.title {
  /* text-shadow: 1px 1px 1px #2C3E50; */
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  margin-bottom: .5rem;
  word-wrap: break-word;
  background-color: var(--bcw);
  background-clip: border-box;
  /* border: 1px solid #eee; */
  border-radius: 5px;
  will-change: animation;
  /* transition: all 0.3s ease; */
}

.card:hover {
  animation: enlarge 1s forwards;
    -moz-animation: enlarge 1s forwards;
    -o-animation: enlarge 1s forwards;
    -webkit-animation: enlarge 1s forwards;
  z-index: 5;
}

@keyframes enlarge {
  from {
    transform: scale(100%, 100%);
  }
  to {
    transform: scale(110%, 110%);
    box-shadow: var(--boxSha);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
  margin: 0;
  border-bottom-width: 80%;
}

.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  text-indent: 2em;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  margin-bottom: 1rem;
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
  color: var(--bcl);
  border-radius: var(--br);
  background-color: rgba(44, 62, 80, 0.2);
}
</style>
