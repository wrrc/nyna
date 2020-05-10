<template>
  <nav :class="{bar: true, bide: bide}">
    <router-link to="/" class="log" tooltip="别点，点就是首页" :placement="isPosition">🎊</router-link>
    <div class="nav" v-show="barShrink">
      <router-link v-for="(item, index) in navSet" :key="index" :to="item.nav_path">{{item.nav_name}}</router-link>
    </div>
    <div class="attach enter-input">
      <input type="search" v-model="handleSearch" class="inputc" style="width: 90%;height: 28px;" placeholder="当然你可以不搜..."  v-show="barShrink" />
      <span></span>
    </div>
    <div class="attach">
      <button v-show="!barShrink" class="btn" @click="dropDown" tooltip="查看更多" :placement="isPosition">👀</button>
      <button v-show="barShrink" @click="toWrite" class="btn" tooltip="我要我要写点神马" :placement="isPosition">🖨</button>
      <button v-show="barShrink" @click="handleNight" class="btn" tooltip="夜间模式" :placement="isPosition">{{ sonOrNight }}</button>
      <button v-show="barShrink" @click="handleLogin" class="btn" tooltip="登录" :placement="isPosition">🚀</button>
      <img :src="`http://127.0.0.1:7001/${userCard.user_avatar}`" v-show="barShrink && showUserAva" @mouseenter="showMode" class="nav-avatar"/>
      <div v-show="userBoard" class="user-board" @mouseenter="clearTime" @mouseleave="hideMode">
        <button class="btn" @click="userQuit">退出</button>
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
      }
    },
    methods: {
      ...mapMutations({
        setUserCard: 'setUserCard',
        setToken: 'setToken',
      }),
      dropDown() {
        this.$store.commit({
          type: 'setIsDown',
          val: false,
        });
        this.$store.commit('setModeVisible');
        // document.body.style.filter = 'blur(5px)';
      },
      handleNight() {
        this.$store.commit('setNight');
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
        console.log('object');
        this.setUserCard([]);
        this.setToken('');
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userCard');
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
      handleSearch(newValue, oldValue) {},
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
  border: 1em solid ;
  border-color: transparent transparent var(--bcb) transparent;
}
</style>