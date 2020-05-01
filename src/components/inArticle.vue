<template>
  <!-- <div>
    <div class="time-list">
    <section class="card">
      <div class="card-header">
        <h4>假设这里是标题</h4>
        <label class="time-list-time">
          <em>2020-03-21</em>
        </label>
      </div>
      <article class="card-body">
        这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
      </article>
    </section>
    </div>
  </div> -->
  <div class="content-left">
    <p class="h5 leading-symbol">全部文章</p>
    <div class="article-warp">
      <section class="card">
        <div class="card-header">
          <p>
            <cite class="h5 title">关于用 Vue 搭建博客</cite>
          </p>
          2020-04-21
        </div>
        <article class="card-body">
          这个东西不太好弄啊，，，，，气死个人，边做边想，要是有设计稿就好惹 (∪.∪ )...zzz，气死个人，边做边想，要是有设计稿就好惹 (∪.∪ )...zzz
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
      <section class="card">
        <div class="card-header">
          <p>
            <cite class="h5 title">关于用 Vue 搭建博客</cite>
          </p>
          2020-04-21
        </div>
        <article class="card-body">
          这个东西不太好弄啊，，，，，气死个人，边做边想，要是有设计稿就好惹 (∪.∪ )...zzz，气死个人，边做边想，要是有设计稿就好惹 (∪.∪ )...zzz
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
</template>

<script>
export default {
  name: "wr-in-article",
  // beforeCreate() {

  // },
  data() {
    return {
      dataList: [
        // {
        //   time: string,
        //   title: strign,
        //   article: string
        // }
      ]
    }
  }
};
</script>

<style scoped>
.content-left {
  /* width: 80%; */
  margin-right: 30px;
  margin-bottom: 30px;
}

.article-warp {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
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
  color: var(--bcb);
  background-color: var(--bcw);
  background-clip: border-box;
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

/* inArticle */
.time-list {
  position: relative;
  padding: 1rem 0 2rem 3rem;
}

/* 列表项自带竖线 */
.time-list:before {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  border-right: 1px dashed rgba(44, 62, 80, 0.1);
}

/* 列表项自带小圆点 */
.time-list:after {
  content: "";
  display: inline-block;
  position: absolute;
  left: 0;
  top: 40%;
  width: 10px;
  height: 10px;
  background-color: rgba(44, 62, 80, 0.8);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.time-list:hover:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  background-color: #3d93fd;
  border: 4px solid #88bdfe;
  border-radius: 8px;
  left: -3px;
  -webkit-box-shadow: 0 0 0 3px #d8e9ff;
  box-shadow: 0 0 0 3px #d8e9ff;
}

.time-list:hover .card {
  box-shadow: 0 20px 40px -15px rgba(0,0,0,.2);
  -webkit-box-shadow: 0 20px 40px -15px rgba(0,0,0,.2);
}

.time-list-time {
  /* margin-bottom: 50px; */
  color: var(--bcb);
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: var(--bcw);
  background-clip: border-box;
  border: 1px solid rgba(44, 62, 80, 0.125);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin: 0;
  background-color: rgba(44, 62, 80, 0.03);
  border-bottom: 1px solid rgba(44, 62, 80, 0.125);
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
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
</style>