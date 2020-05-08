<template>
  <div class="content-left">
    <p class="h5 leading-symbol">全部文章</p>
    <div class="article-warp" v-if="dataList.length > 0">
      <!-- <transition-group :name="tranname"> -->
      <section class="card" v-for="(v, index) in dataList" :key="index">
        <div class="card-header">
          <a @click.prevent="handleJump(index)">
            <cite class="h5 title">{{ v.article_title }}</cite>
          </a>
          {{ v.article_release_time.replace(/[TZ]|\.|0{3}/g,' ') }}
        </div>
        <article class="card-body">{{ v.article_description }}</article>
        <div class="card-footer">
          <div class="flags">
            <span class="flag" v-for="(t, index) in v.blog_article_tags" :data-id="t.tag_gid" :key="index">{{ t.tag_name }}</span>
          </div>
          <div class="flags">
            <button class="flag"> <!--  tooltip="查看详情" placement="bottom" -->
              🔬
              <span>{{ v.article_look }}</span>
            </button>
            <button class="flag">
              ❤
              <span>{{ v.article_keep }}</span>
            </button>
            <button class="flag">
              ✒
              <span>511</span>
            </button>
          </div>
        </div>
      </section>
      <!-- </transition-group> -->
    </div>
    <div v-else class="article-warp">
      <p>Sorry, no items found...</p>
    </div>
    <div style="display: flex;justify-content: center;">
      <ul class="pagination">
        <li class="pagination-list">
          <a href="#" @click.prevent="toBefore">&laquo;</a>
        </li>
        <li :class="{ 'pagination-list': true, 'High-light': v.highlight }" v-for="(v, index) in pageNumber" :key="index">
          <a href="#" @click.prevent="handleNext(index)">{{ v.pageNumber }}</a>
        </li>
        <li class="pagination-list">
          <a href="#" @click.prevent="toAfter">&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "wr-in-article",
  data() {
    return {
      dataList: [],
      sum: 0,
      pageNumber: [],
      limit: 5,
    }
  },
  created() {
    axios
      .get(`/getArticleList?limit=${ this.limit }&offset=0`)
      .then(({code, dataSet}) => {
        if (code === 100) {
          this.dataList = dataSet.rows;
          this.sum = dataSet.count;
          const pageSum = Math.ceil(this.sum/5);
          for (let i = 1; i <= pageSum; i++) {
            this.pageNumber.push({
              pageNumber: i,
              highlight: i === 1 ? true : false,
            });
          }
        }
      })
  },
  methods: {
    handleNext(i) {
      this.pageNumber.forEach((v, index) => {
        if (i === index) {
          v.highlight = true;
        } else {
          v.highlight = false;
        }
      });
      axios
        .get(`/getArticleList?limit=${ this.limit }&offset=${ this.limit * i }`)
        .then(({code, dataSet}) => {
          if (code === 100) {
            this.dataList = dataSet.rows;
          }
        });
    },
    toBefore() {
      this.pageNumber.forEach((v, i) => {
        if (v.highlight) {
          if (i >= 1) {
            --i;
            this.handleNext(i);
          }
        }
      });
    },
    toAfter() {
      const v = this.pageNumber.filter(v => {
        if (v.highlight) {
          return v;
        }
      })
      if (v[0].pageNumber < this.pageNumber.length) {
        this.handleNext(v[0].pageNumber);
      }
    },
    handleJump(i) {
      const id = this.dataList[i].article_gid;
      this.$router.push({ name: 'Article', params: { id } });
    }
  },
};
</script>

<style scoped>
.content-left {
  width: inherit;
  margin-right: 30px;
  margin-bottom: 30px;
}

.article-warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  animation: enlarge .5s forwards;
    -moz-animation: enlarge .5s forwards;
    -o-animation: enlarge .5s forwards;
    -webkit-animation: enlarge .5s forwards;
  /* z-index: 5; */
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

.card-header a {
  position: relative;
  cursor: pointer;
}

.card-header a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: var(--bcb);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.3s ease-out;
}

.card-header a:hover {
  color: #42b983;
}

.card-header a:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}

.card-body {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  text-indent: 2em;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}

.flag {
  padding: 4px 12px;
  font-size: x-small;
  color: lightseagreen;
  background: #EFEFEF;
  border: 0;
  border-radius: 0;
  cursor: pointer;
}

.flag:first-child {
  border-top-left-radius: var(--br);
  border-bottom-left-radius: var(--br);
}

.flag:last-child {
  border-top-right-radius: var(--br);
  border-bottom-right-radius: var(--br);
}

/* .flag:last-child:hover {
  animation: shake 0.8s cubic-bezier(.36, .07, .19, .97) both;
} */

.pagination {
  width: max-content;
  padding: 0;
  height: 38px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.pagination-list {
  padding: 6px;
  font-size: 80%;
  border: 1px solid #EFEFEF;
  color: var(--bcb);
  background: var(--bcw);
  transition: all .3s ease;
}

.pagination-list > a {
  padding: 6px;
  color: inherit;
}

.High-light {
  font-size: 100%;
  color: var(--bcw);
  background: var(--bcb);
}

.pagination-list:active {
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
  -ms-transform: scale(0.9);
  -o-transform: scale(0.9);
  transform: scale(.9);
}

.pagination-list:first-child {
  border-top-left-radius: var(--br);
  border-bottom-left-radius: var(--br);
}

.pagination-list:last-child {
  border-top-right-radius: var(--br);
  border-bottom-right-radius: var(--br);
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
</style>