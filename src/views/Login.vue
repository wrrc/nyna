<template>
  <wr-mode>
    <div class="mode-header">
      <button class="btn" ref="withRegist" @click="switchShow">注册</button>
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
          <img src="http://127.0.0.1:7001/getCode" alt="重新加载" style="border-radius: 5px;" />
        </a>
      </div>
      <span class="tip">{{ tip.verific }}</span>
    </form>
    <div class="mode-footer">
      <button class="btn" @click="handleLogin">(👉ﾟヮﾟ)👉</button>
    </div>
  </wr-mode>
</template>

<script>
  export default {
    name: 'wr-login',
    // components: { OutText },
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
    methods: {
      switchShow() {
        this.isRegist = !this.isRegist;
        this.$refs.withRegist.innerText = this.$refs.withRegist.innerText === '登录' ? '注册' : '登录';
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
        .then((data) => {
          if (data.code === 100) {
            this.disable = true;
            let i = 1000;
            this.timre = setInterval(() => {
              const s = (this.delay-i)/1000;
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
            // this.$api.login(nick, pass, verific);
            axios.post('/login', { nick, pass, verific })
            .then((data) => {
              if (data.code === 202) {
                this.$router.push('/');
                this.$store.commit('setToken', data.dataSet);
                sessionStorage.setItem('userToken', data.dataSet);
              }
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
            .then((data) => {
              let c;
              if (data.code === 201) {
                this.switchShow();
              }
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
          .then((data) => {
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
          this.isRegist && (txt = '* 您的密码强度似乎不够哦，当然如果你坚持...');
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
</style>