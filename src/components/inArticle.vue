<template>
  <div>
    <div class="time-list">
    <!-- <label class="time-list-time h5">
      <em>2020-03-21</em>
    </label> -->
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
    <!-- <router-link tooltip="让我康康" placement="right-top" to>👁‍🗨</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "wr-in-article",
  beforeCreate() {

  },
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

.time-list:hover > .card {
  /* background-color: #3d93fd; */
  /* color: #fff; */
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