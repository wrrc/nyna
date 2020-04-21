<template>
  <div>
    <div class="timeList">
    <label class="timeList_time h5">
      <em>2020-03-21</em>
    </label>
    <section class="card">
      <h4 class="card-header">当然！这里要放标题的</h4>
      <article class="card-body">
        这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
      </article>
    </section>
    <!-- <router-link tooltip="让我康康" placement="right-top" to>👁‍🗨</router-link> -->
    </div>
    <div class="timeList">
    <label class="timeList_time h5">
      <em>2020-03-21</em>
    </label>
    <section class="card">
      <h4 class="card-header">当然！这里要放标题的</h4>
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
.timeList {
  position: relative;
  padding: 1rem 0 2rem 3rem;
  z-index: 5;
}
/* 列表项自带竖线 */
.timeList:before {
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
.timeList:after {
  content: "";
  display: inline-block;
  position: absolute;
  left: 0;
  top: 1.5rem;
  width: 10px;
  height: 10px;
  background-color: rgba(44, 62, 80, 0.8);
  border-radius: 5px;
  /* margin-top: -2px; */
  transition: all 0.3s ease;
}
/* .timeList-first:before {
    height: 50%;
    top: 50%;
}
.timeList-last:before {
    height: 50%;
} */
.timeList:hover:after {
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
.timeList:hover > .card {
  /* background-color: #3d93fd; */
  /* color: #fff; */
}
.timeList:hover .card {
  box-shadow: 3px 3px 15px -5px #485b6e;
  -webkit-box-shadow: 3px 3px 15px -5px #485b6e;
}
.timeList_time {
  margin-bottom: 50px;
  color: rgba(44, 62, 80, 0.8);
}
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
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
}
.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}
.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
}
</style>