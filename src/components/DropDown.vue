<template>
  <div :class="{ mode: modeVisible }">
    <div class="drop_from" :class="{showDown: hei}">
      <span @click="handleClosk" class="close">✖</span>
      <img :src="`http://127.0.0.1:7001/${userCard.user_avatar}`" alt="此处应该是头像" style="height: 20vh;border-radius: 50%;margin-top: 15px;" />
      <div class="drop_item">
        <router-link v-for="(item, index) in navSet" :key="index" :to="item.nav_path">{{item.nav_name}}</router-link>
        <a href="">分享</a>
      </div>
      <div style="display: flex;flex-direction: column;">
        <div style="display: flex;justify-content: space-around;">
          <label style="color: #fff;">夜间模式</label>
          <span :class="{ 'swich-btn': true, 'switch-btn-on': switchNight, 'switch-btn-out': !switchNight }" @click="toggle"></span>
        </div>
        <div style="display: flex;justify-content: center;margin-top: 15px;">
          <button class="btn" @click="handleLogin" style="width: 80%;">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: '',
    methods: {
      handleClosk() {
        this.$store.commit({
          type: 'setIsDown',
          val: true,
        });
        this.$store.commit('setModeVisible');
      },
      handleLogin() {
        this.$router.push('/login');
        this.handleClosk();
      },
      toggle() {
        this.$store.commit('setNight');
      }
    },
    computed: mapState({
      navSet: 'nav',
      hei: 'isDown',
      modeVisible: 'modeVisible',
      switchNight: 'switchNight',
      userCard: 'userCard',
    })
  }
</script>

<style scoped>
.mode {
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  z-index: 100;
  background: rgba(241, 241, 240, .5);
  transition: background .5s ease-out;
}

.drop_from {
  position: fixed;
  top: 10%;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
  border-radius: 20px;
  background-color: rgba(66, 66, 66, 1);
  text-align: center;
  z-index: 10;
  transition: all .3s ease;
}

.showDown {
  right: -224px;
}

.drop_item {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  justify-content: center;
}

.drop_item a {
  width: 85%;
  padding: 6px 12px;
  color: #fff;
}

.drop_item a:hover {
  animation: a-tran .3s ease forwards;
}

@keyframes a-tran {
  to {
    transform: translateX(5%);
  }
}

.close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  cursor: pointer;
}

.swich-btn {
  position: relative;
  width: 50px;
  height: 20px;
  padding: 4px 5px;
  border: 0;
  background-color: #666;
  border-radius: 25px;
  cursor: pointer;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  transition: background .5s ease;
}

.swich-btn::after {
  content: " ";
  position: absolute;
  left: 5px;
  width: 35%;
  height: inherit;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0 3px 1px 0 rgba(0,0,0,.05);
  transition: all .3s ease;
}

@keyframes slide-on {
  from {
    transform: translateX(2px);
  }
  20% {
    transform: translateX(5px);
    width: 45%;
  }
  to {
    transform: translateX(27px);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(25px);
  }
  20% {
    transform: translateX(20px);
    width: 45%;
  }
  to {
    transform: translateX(0);
  }
}

.switch-btn-on {
  background-color: rgb(255, 227, 108);
}

.switch-btn-on:after {
  transform: translateX(25px);
  animation: slide-on .3s ease-out forwards;
}

.switch-btn-out:after {
  animation: slide-out .3s ease-out forwards;
}
</style>