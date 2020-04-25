<template>
  <div class="mode">
    <div class="mode-dialog">
      <div class="mode-header">
        <button class="btn" @click="switchShow">注册</button>
        <button class="btn" @click="close">✖</button>
      </div>
      <form class="mode-content">
        <p class="h5" style="margin: .5rem auto;font-weight: bold;;color: rgba(66, 66, 66, .8);">请填写相关信息以进行登录</p>
        <input type="email" v-model="froms.phone" v-show="isRegist" class="inputc" placeholder="邮箱" />
        <input type="text" maxlength="6" v-model="froms.code" v-show="isRegist" class="inputc" placeholder="验证码" />
        <input type="text" v-model="froms.nick" class="inputc" placeholder="用户名" />
        <input type="password" v-model="froms.pass" class="inputc" placeholder="密码" />
        <input type="password" v-model="froms.passi" v-show="isRegist" class="inputc" placeholder="重复密码" />
        <input type="text" v-model="froms.verific" v-show="!isRegist" class="inputc" placeholder="验证码" maxlength="4" />
      </form>
      <div class="mode-footer">
        <button class="btn" @click="handleLogin">(☞ﾟヮﾟ)👉</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wr-login',
    data() {
      return {
        froms: {
          phone: '',
          code: '',
          nick: '',
          pass: '',
          passi: '',
          verific: ''
        },
        isRegist: false,
      }
    },
    methods: {
      close() {
        this.$router.go(-1);
      },
      handleLogin() {
        console.log(this.froms);
      },
      switchShow(e) {
        this.isRegist === true ? this.isRegist = false : this.isRegist = true;
        e.target.innerText = e.target.innerText === '登录' ? '注册' : '登录';
      }
    },
  }
</script>

<style scoped>
.mode {
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  z-index: 100;
  background: rgba(241, 241, 240, .5);
}

.mode-dialog {
  position: absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  max-width: 500px;
  height: max-content;
  padding: 20px;
  margin: auto;
  border-radius: var(--br);
  background:hsla(0, 0%, 100%, .9);
  animation: bc-drop .6s forwards;
}

.mode-header {
  display: flex;
  justify-content: space-between;
}

.mode-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 3rem;
}

.inputc {
  width: 80%;
  height: 25px;
  padding: var(--pad);
  margin: .5rem auto;
  border: 0;
  font-size: 1rem;
  color: var(--bcb);
  border-radius: var(--br);
  background-color: #e6ebe6;
  /* border: 1px solid #e3e3e3; */
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  transition: all .8s ease;
}

.inputc:focus {
  background-color: var(--bcw);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
          box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.mode-footer {
  display: flex;
  justify-content: center;
}

.mode-footer > .btn {
  /* border: 0; */
  /* box-shadow: var(--boxSha); */
  width: 50%;
  background: linear-gradient(45deg, #7fffd4,#e6e6fa, ghostwhite);
    animation: hueRotate 5s infinite alternate;
}

@keyframes hueRotate {
  from {
    filter: hue-rotate(0);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
</style>