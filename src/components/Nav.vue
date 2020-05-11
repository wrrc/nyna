<template>
  <nav :class="{bar: true, bide: bide}">
    <router-link to="/" class="log" tooltip="别点，点就是首页" :placement="isPosition">🎊</router-link>
    <div class="nav" v-show="barShrink">
      <router-link v-for="(item, index) in navSet" :key="index" :to="item.nav_path">{{item.nav_name}}</router-link>
    </div>
    <div :class="[ 'attach', 'enter-input', { 'grow-bigger': bigger }]">
      <input type="search" v-model="handleSearch" @focus="showSearchList" @blur="hideSearchList" class="inputc" style="width: 90%;height: 28px;" placeholder="当然你可以不搜..."  v-show="barShrink" />
      <span></span>
    </div>
    <div class="attach">
      <button v-show="!barShrink" class="btn" @click="dropDown" tooltip="查看更多" :placement="isPosition">👀</button>
      <button v-show="barShrink" @click="toWrite" class="btn" tooltip="我要我要写点神马" :placement="isPosition">🖨</button>
      <button v-show="barShrink" @click="handleNight" class="btn" tooltip="夜间模式" :placement="isPosition">{{ sonOrNight }}</button>
      <button v-show="barShrink" @click="handleLogin" class="btn" tooltip="登录" :placement="isPosition">🚀</button>
      <img :src="`http://127.0.0.1:7001/${userCard.user_avatar}`" v-show="barShrink && showUserAva" @mouseenter="showMode" class="nav-avatar"/>

      <!-- 退出 -->
      <div v-show="userBoard" class="user-board" @mouseenter="clearTime" @mouseleave="hideMode">
        <button class="btn" @click="userQuit">退出</button>
      </div>

      <!-- 搜索 -->
      <div class="to-search" v-show="list.length > 0">
        <!-- <input type="text" v-model="val" name="" id="" /> -->
        <!-- <div class="navs">
          <ul class="relation" @click="heightLight">
            <li data-path="/article">文章</li>
            <li data-path="/content">内容</li>
            <li data-path="/tag">标签</li>
          </ul>
          <div class="box1"></div>
        </div> -->

        <div class="search-content">
          <div v-show="list" v-for="(v, index) in list" :key="index">
            <div style="padding: 6px 12px;">
              <strong><a href="#"><cite v-html="v.title"></cite></a></strong>
              <p style="text-indent: 2em;font-size: x-small;word-break: break-all; width: inherit;" v-html="v.main"></p>
            </div>
          </div>
          <button @click.prevent="loadMore" class="btn">加载更多</button>
          <div v-show="!list"></div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';

  export default {
    name: 'wr-nav',
    props: ['isPosition'],
    data() {
      return {
        handleSearch: '',
        userBoard: false,
        timer: null,
        bigger: false,
        list: [],
        count: 0,
      }
    },
    methods: {
      ...mapMutations({
        setUserCard: 'setUserCard',
        setToken: 'setToken',
        setNight: 'setNight',
        setModeVisible: 'setModeVisible',
        setIsDown: 'setIsDown',
      }),
      dropDown() {
        this.setIsDown({
          val: false,
        });
        this.setModeVisible();
        // document.body.style.filter = 'blur(5px)';
      },
      handleNight() {
        this.setNight();
      },
      handleLogin() {
        this.$router.push('/login');
      },
      toWrite() {
        this.$router.push('/write');
      },
      showMode() {
        this.userBoard = true;
        this.timer = setTimeout(() => {
          this.userBoard = false;
          clearTimeout(this.timer);
        }, 3000);
      },
      clearTime() {
        clearTimeout(this.timer);
      },
      hideMode() {
        this.userBoard = false;
      },
      userQuit() {
        this.setUserCard([]);
        this.setToken('');
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userCard');
      },
      showSearchList() {
        this.bigger = !this.bigger;
        this.setModeVisible();
      },
      hideSearchList() {
        this.showSearchList();
        this.list = [];
        this.handleSearch = '';
      },
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
      translate(obj, reg) {
        obj.forEach(v => {
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
      },
      loadMore() {
        const reg = new RegExp(`${this.handleSearch}`, 'ig');
        axios
          .get('/searchAll', {
            params: {
              val: newValue,
              lim: this.count++,
            }
          })
          .then(res => {
            this.translate(res.dataSet, reg);
            this.list.push(res.dataSet);
          })
      }
    },
    // 3.0 获取多个状态，不必每个都生成计算属性
    computed: mapState({

      // 正如 vuex 教程中说的，箭头函数可使代码更简练
      navSet: state => state.nav,

      // 传字符串参数 'bide' 等同于 `state => state.bide`
      bide: 'backIsShow',
      barShrink: 'barShrink',
      sonOrNight: 'sonOrNight',
      userCard: 'userCard',
      showUserAva: 'showUserAva',
    }),
    watch: {
      handleSearch(newValue, oldValue) {
        if (newValue !== '') {
          const reg = new RegExp(`${newValue}`, 'ig');
          axios
            .get('/searchAll', {
              params: {
                val: newValue,
                lim: this.count,
              }
            })
            .then(res => {
              this.translate(res.dataSet, reg);
              this.list = res.dataSet;
            })
        } else {
          this.list.splice(0);
        }
      },
    },

    // 2.0 通过 API 获取导航，挂到 vuex
    // 计算属性取 store 值
    // computed: {
    //   navSet() {
    //     return this.$store.state.nav;
    //   },
    // },

    // 1.0 初始版本
    // data() {
    //   return {
    //     routes: [
    //       { name: '🎊 主页', path: '/' },
    //       { name: '📻 分类', path: '/typeOrTag' },
    //       { name: '🎟 友链', path: '/friendsLink' },
    //       { name: '🎏 关于', path: '/about' },
    //     ]
    //   }
    // }
  }
</script>

<style scoped>
.grow-bigger {
  z-index: 3100;
  animation: input-big .3s ease forwards;
}

@keyframes input-big {
  to {
    transform: translateY(200%) scale(1.5, 1.5);
  }
}

.attach {
  position: relative;
}
.nav-avatar {
  position: absolute;
  right: -0.8em;
  width: 4em;
  height: 4em;
  border-radius: 50%;
  cursor: pointer;
  transition: all .3s ease;
}

.nav-avatar:hover {
  border: 1px solid #666;
  box-shadow: var(--boxSha);
}

.nav-avatar:active {
  animation: to-scale .5s ease forwards;
}

@keyframes to-scale {
  to {
    transform: scale(2, 2);
  }
}

.user-board {
  width: max-content;
  position: absolute;
  top: 3.5em;right: .4em;
  padding: 1em 2em;
  border-radius: var(--br);
  background: var(--bcb);
  box-shadow: var(--boxSha);
  z-index: 1600;
  animation: anime-bottom .3s ease-out forwards;
}

.user-board::before {
  content: "";
  position: absolute;
  top: -1.5em;right: 0;
  width: 0;
  height: 0;
  border: 1em solid;
  border-color: transparent transparent var(--bcb) transparent;
}

.to-search {
  max-width: 500px;
  max-height: 550px;
  overflow: hidden;
  overflow-y: scroll;
  position: fixed;
  top: 160px;left: 0;right: 0;
  margin: 0 auto;
  border-radius: var(--br);
  background: var(--bcw);
  display: flex;
  justify-content: center;
  z-index: 3000;
  animation: output-in .5s ease-in-out forwards;
}

@keyframes output-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.to-search::-webkit-scrollbar {
  max-width: 10px;
  width: 1%;
  height: 1%;
}

.to-search::-webkit-scrollbar-thumb {
  background-color: var(--bcb);
}

/* .navs {
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
} */

.search-content {
  padding: 12px;
}
</style>