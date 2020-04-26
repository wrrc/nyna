<template>
  <div class="mode">
    <div class="mode-dialog">
      <div class="mode-header">
        <button class="btn" @click="switchShow">注册</button>
        <button class="btn" @click="close">✖</button>
      </div>
      <form class="mode-content">
        <p class="h5">请填写相关信息以进行登录</p>
        <input type="email" v-model="froms.email" v-show="isRegist" class="inputc" placeholder="邮箱" />
        <div class="from-different" v-show="isRegist">
          <input type="text" maxlength="6" v-model="froms.code" class="inputc" placeholder="验证码" />
          <button @click.prevent="registReq" :disabled="disable" :class="{ btn: true, disable: disable}">发送验证码</button>
        </div>
        <input type="text" v-model="froms.nick" class="inputc" placeholder="用户名" />
        <input type="password" v-model="froms.pass" class="inputc" placeholder="密码" />
        <input type="password" v-model="froms.passi" v-show="isRegist" class="inputc" placeholder="重复密码" />
        <div class="from-different" v-show="!isRegist">
          <input type="text" v-model="froms.verific" class="inputc" placeholder="验证码" maxlength="4" />
          <a href="#" @click="again" tooltip="点击切换" placement="right">
            <img src="http://127.0.0.1:7001/getCode" alt="加载错误" style="border-radius: 5px;" />
          </a>
        </div>
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
          email: 'binghuaziyun1998@163.com',
          code: '',
          nick: 'er',
          pass: '123456',
          passi: '',
          verific: ''
        },
        disable: false,
        timre: null,
        delay: 180000,
        isRegist: false,
      }
    },
    created() {
      const time = localStorage.getItem['wait'];
      console.log('time', time);
      if (time >= this.delay) {

      }
    },
    methods: {
      close() {
        this.$router.go(-1);
      },
      registReq(e) {
        axios.post('/regist', {
          email: this.froms.email,
        }).then(({ data }) => {
          console.log(data);
          if (data.code === 101) {
            this.disable = true;
            let i = 1000;
            this.timre = setInterval(() => {
              const s = (this.delay-i)/1000;
              localStorage.setItem['wait'] = s;
              e.target.innerText = `等待 ${s} 秒`;
              i += 1000;
              if (i >= this.delay) {
                clearInterval(this.timer);
                this.disable = false;
                e.target.innerText = '发送验证码';
              }
            }, 1000);
          } else {
            alert('发送错误!');
          }
        })
      },
      handleLogin() {
        if (!this.isRegist) {

          axios.post('/login', this.froms)
            .then(res => console.log('用户名或密码错误'))
        } else {
          axios.post('/regist')
        }
      },
      switchShow(e) {
        this.isRegist === true ? this.isRegist = false : this.isRegist = true;
        e.target.innerText = e.target.innerText === '登录' ? '注册' : '登录';
      },
      again(e) {
        e.target.src = 'http://127.0.0.1:7001/getCode?cd=' + Math.random();
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
  transition: background .5s ease-out;
}

.mode:before {
  content: " ";
  position: absolute;
  filter: blur(5px);
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
  /* filter: blur(.03rem); */
  animation: bc-drop .6s forwards;
}

.mode-header {
  display: flex;
  justify-content: space-between;
}

.mode-content {
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem;
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

.from-different {
  position: relative;
  display: flex;
  justify-content: center;
}

.from-different button, .from-different a {
  position: absolute;
  top: 12px;
  right: 35px;
}

.disable {
  cursor: wait;
  animation: '';
}

.mode-footer {
  display: flex;
  justify-content: center;
}

.mode-footer > .btn {
  /* border: 0; */
  /* box-shadow: var(--boxSha); */
  width: 50%;
  background: linear-gradient(45deg, #a8edea,#e6e6fa, #fed6e3 );
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