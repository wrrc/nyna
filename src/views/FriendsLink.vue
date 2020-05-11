<template>
  <div class="box">
    <p class="h2">
      额，这里还没有其他小伙伴哦
    </p>
    <div>
      <!-- <input type="text" v-model="val" name="" id="" /> -->
      <div class="navs">
        <ul class="relation" @click="heightLight">
          <li data-path="/article">文章</li>
          <li data-path="/content">内容</li>
          <li data-path="/tag">标签</li>
        </ul>
        <div class="box1"></div>
      </div>

      <div class="search-content">
        <div v-for="(v, index) in list" :key="index">
          <cite v-html="v.title"></cite>
          <p style="text-indent: 2em;" v-html="v.main"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wr-search',
  data() {
    return {
      val: '',
      list: [],
    }
  },
  watch: {
    val(newValue, oldValue) {
      if (newValue !== '') {
        const reg = new RegExp(`${newValue}`, 'ig');
        axios
          .get('/searchAll', {
            params: { val: newValue }
          })
          .then(res => {
            res.dataSet.forEach(v => {
              const rep = v.title.replace(reg, kw => {
                return `<mark>${kw}</mark>`
              });
              const rep1 = v.main.replace(reg, kw => {
                return `<mark>${kw}</mark>`
              });
              delete v.title;
              delete v.main;
              v.title = rep;
              v.main = rep1;
            });
            console.log(res.dataSet);
            this.list = res.dataSet;
          })
      } else {
        this.list.splice(0);
      }
    },
  },
  methods: {
    heightLight(e) {
      if (e.target.nodeName === 'LI') {
        const lis = (e.target.parentElement.children);
        for (let i = 0; i < lis.length; i++) {
          if (e.target.innerText === lis[i].innerText) {
            const box = document.querySelector('.box1');
            box.style.left = 12 + i * 60 + 'px';
          }
        }

      }
    },
  },
}
</script>

<style scoped>
.navs {
  position: relative;
}

.relation {
  margin: 0;
  padding: 6px 12px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  border-radius: var(--br);
}

.relation > li {
  padding: 6px 12px;
  border-radius: var(--br);
}

.relation > li:hover {
  cursor: pointer;
}

.search-content {

}

.box1 {
  position: absolute;
  top: 6px;
  left: 12px;
  width: 60px;
  height: 36px;
  background: yellowgreen;
  border-radius: var(--br);
  z-index: -1;
  box-shadow: var(--boxSha);
  transition: all .3s linear;
}
</style>