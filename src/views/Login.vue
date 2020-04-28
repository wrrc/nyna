<template>
  <div class="mode">
    <div class="mode-dialog">
      <div class="mode-header">
        <button class="btn" @click="switchShow">注册</button>
        <button class="btn" @click="close">✖</button>
      </div>
      <form class="mode-content">
        <p class="h5" v-show="!isRegist" style="text-align: center;">
          请填写相关信息以进行登录
        </p>
        <p class="h5" v-show="isRegist" style="text-align: center;">
          验证码有效时间只有三分钟...
        </p>
        <div class="enter-input" v-show="isRegist">
          <input type="email" @blur="emailBlur" v-model="froms.email" class="inputc" placeholder="邮箱" />
          <span></span>
        </div>
        <span class="tip">{{ tip.email }}</span>

        <div class="enter-input" v-show="isRegist">
          <input type="text" @blur="emailCodeBlur" v-model="froms.code" class="inputc" maxlength="6" placeholder="验证码" />
          <span></span>
          <button @click.prevent="reqCode" :disabled="disable" :class="{ btn: true, disable: disable}">发送验证码</button>
        </div>
        <span class="tip">{{ tip.code }}</span>

        <div class="enter-input">
          <input type="text" @blur="nickBlur" v-model="froms.nick" class="inputc" placeholder="用户名" />
          <span></span>
        </div>
        <span class="tip">{{ tip.nick }}</span>

        <div class="enter-input">
          <input type="password" @blur="passBlur" v-model="froms.pass" class="inputc" placeholder="密码" />
          <span></span>
        </div>
        <span class="tip">{{ tip.pass }}</span>

        <div class="enter-input" v-show="isRegist">
          <input type="password" @blur="passiBlur" v-model="froms.passi" class="inputc" placeholder="重复密码" />
          <span></span>
        </div>
        <span class="tip">{{ tip.passi }}</span>

        <div class="enter-input" v-show="!isRegist">
          <input type="text" @blur="pngCodeBlur" v-model="froms.verific" class="inputc" maxlength="4" placeholder="验证码" />
          <span></span>
          <a href="#" @click="again" tooltip="点击切换" placement="right">
            <img src="http://127.0.0.1:7001/getCode" alt="加载错误" style="border-radius: 5px;" />
          </a>
        </div>
        <span class="tip">{{ tip.verific }}</span>
      </form>
      <div class="mode-footer">
        <button class="btn" @click="handleLogin">(☞ﾟヮﾟ)👉</button>
      </div>
    </div>
  </div>
</template>

<script>
  import OutText from '@/components/OutText.vue';

  export default {
    name: 'wr-login',
    components: { OutText },
    data() {
      return {
        froms: {
          email: '',
          code: '',
          nick: '',
          pass: '',
          passi: '',
          verific: '',
        },
        tip: {
          email: '',
          code: '',
          nick: '',
          pass: '',
          passi: '',
          verific: '',
        },
        disable: false,
        timre: null,
        delay: 180000,
        isRegist: false,
      }
    },
    /* created() {
      const time = window.localStorage.getItem['wait'];
      console.log(time);
      if (time >= this.delay) {
        console.log(time);
      }
    }, */
    methods: {
      switchShow(e) {
        this.isRegist = !this.isRegist;
        e.target.innerText = e.target.innerText === '登录' ? '注册' : '登录';
      },
      close() {
        this.$router.go(-1);
      },
      reqCode(e) {
        axios
        .post(
          '/getEmailCode',
          { email: this.froms.email }
        )
        .then(({ data }) => {
          if (data.code === 100) {
            this.disable = true;
            let i = 1000;
            this.timre = setInterval(() => {
              const s = (this.delay-i)/1000;
              // window.localStorage.setItem['wait'] = `${s}`;
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
        // 登录
        if (!this.isRegist) {
          const { nick, pass, verific } = this.froms;
          if (nick && pass && verific) {
            axios.post('/login', { nick, pass, verific })
            .then(res => { this.$store.commit(
              'setAlertInfo',
              {
                color: 3,
                msg: '用户名或密码错误'
              })
            })
          } else {
            this.$store.commit(
              'setAlertInfo',
              {
                color: 2,
                msg: '请填写完整信息'
            });
          }
        } else {
          // 注册
          const { email, code, nick, pass, passi } = this.froms;
          if (email && code && nick && pass && passi) {
            axios.post('/users', { email, code, nick, pass })
            .then(({ data }) => {
              let c, m = data.message;
              if (data.code === 104) {
                c = 1;
              } else if (data.code === 101005) {
                c = 3;
              } else if (data.code === 101004) {
                c = 2;
              }
              this.$store.commit('setAlertInfo', {
                color: c,
                msg: m
              })
            })
          } else {
            this.$store.commit(
              'setAlertInfo',
              {
                color: 2,
                msg: '请填写完整信息'
            });
          }

        }
      },
      pngCodeBlur() {
        if (this.froms.verific !== '') {
          axios({
            method: 'get',
            url: '/valiPngCode?code=' + this.froms.verific,
          })
          .then(({ data }) => {
            if (data.code === 100) {
              this.tip.verific = '✔ 验证成功';
            } else {
              this.tip.verific = '❌ 验证码错了欸';
            }
          });
        } else {
          this.tip.verific = '* 此为必填项';
        }
      },
      emailCodeBlur() {
        let txt = '';
        if (this.froms.code === '') {
          txt = '* 此为必填项';
        //   axios({
        //     method: 'get',
        //     url: '/valiEmailCode?code=' + this.froms.code,
        //   })
        //   .then(({ data }) => {
        //     if (data.code === 100) {
        //       this.tip.code = '✔ 验证成功';
        //     } else {
        //       this.tip.code = '❌ 验证码错了欸';
        //     }
        //   });
        // } else {
        //   this.tip.code = '* 此为必填项';
        }
        this.tip.code = txt;
      },
      emailBlur() {
        let txt = '';
        if (this.froms.email === '') {
          txt = '* 此为必填项';
        } /* else if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.froms.email)) {
          txt = '* 邮箱格式错误';
        } */
        this.tip.email = txt;
      },
      nickBlur() {
        let txt = '';
        if (this.froms.nick === '') {
          txt = '* 此为必填项';
        }
        this.tip.nick = txt;
      },
      passBlur() {
        let txt = '';
        if (this.froms.pass === '') {
          txt = '* 此为必填项';
        } else if (this.froms.pass.length < 6 || /[A-Z@#\$%\^\&\*]/.test(this.froms.pass)) {
          txt = '* 您的密码强度似乎不够哦，当然如果你坚持...';
        }
        this.tip.pass = txt;
      },
      passiBlur() {
        let txt = '';
        if (this.froms.passi === '') {
          txt = '* 此为必填项';
        } else if (this.froms.pass !== this.froms.passi) {
          txt = '* 两次密码似乎不一致哦，请重新输入';
        }
        this.tip.passi = txt;
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
  z-index: 50;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem;
}

.enter-input {
  position: relative;
  display: flex;
  justify-content: center;
}

.enter-input button, .enter-input a {
  position: absolute;
  top: 12px;
  right: 35px;
}

.inputc {
  width: 80%;
  height: 25px;
  padding: var(--pad);
  margin: .5rem auto;
  outline: none;
  border: none;
  font-size: 1rem;
  color: var(--bcb);
  border-radius: var(--br);
  background: #e6ebe6;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  transition: all .5s ease;
}

.inputc + span {
  width: 85%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 7px;
  height: 2px;
  margin: 0 auto;
  background-color: var(--bcb);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.3s ease-out;
}

.inputc:focus {
  background-color: var(--bcw);
  -webkit-box-shadow: 0 0 0 var(--bcw);
          box-shadow: 0 0 0 var(--bcw);
}

.inputc:focus + span {
  transform: scaleX(1);
  transform-origin: left center;
}

.tip {
  margin-left: 7%;
  color: rgba(200, 50, 50, .8);
  font-size: x-small;
  animation: in-top 1s forwards;
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