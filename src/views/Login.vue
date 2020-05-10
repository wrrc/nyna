<template>
  <wr-mode>
    <div class="mode-header">
      <button class="btn" ref="withRegist" @click="switchShow">注册</button>
      <button class="btn" @click="close">✖</button>
    </div>
    <form class="mode-content">
      <p class="h5" style="text-align: center;">
        请填写相关信息以进行登录
      </p>

      <div class="enter-input">
        <input type="text" @blur="nickBlur" v-model.trim="froms.nick" class="inputc" placeholder="用户名" />
        <span></span>
      </div>
      <span class="tip">{{ tip.nick }}</span>

      <div class="enter-input">
        <input type="password" @blur="passBlur" v-model.trim="froms.pass" class="inputc" placeholder="密码" />
        <span></span>
      </div>
      <span class="tip">{{ tip.pass }}</span>

      <div class="enter-input">
        <input type="text" pattern="^[0-9]{4}$"  @blur="pngCodeBlur" v-model.trim="froms.verific" class="inputc" maxlength="4" placeholder="验证码" />
        <span></span>
        <a href="#" @click="again" tooltip="点击切换" placement="right">
          <img src="http://127.0.0.1:7001/getCode" alt="重新加载" style="border-radius: var(--br);" />
        </a>
      </div>
      <span class="tip">{{ tip.verific }}</span>
    </form>
    <div class="mode-footer">
      <button :class="{ btn: true, disable: !allowLogin }" @click="handleLogin">(👉ﾟヮﾟ)👉</button>
    </div>
  </wr-mode>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'wr-login',
    data() {
      return {
        froms: {
          nick: '',
          pass: '',
          verific: '',
        },
        tip: {
          nick: '',
          pass: '',
          verific: '',
        },
        allowLogin: false,
      }
    },
    methods: {
      ...mapMutations({
        setToken: 'setToken',
        setUserCard: 'setUserCard',
      }),
      switchShow() {
        this.$router.push('/regist');
      },
      close() {
        this.$router.push('/');
      },
      handleLogin() {
        const { nick, pass } = this.froms;
        if (nick && pass && this.allowLogin) {
          // this.$api.login(nick, pass, verific);
          axios.post('/login', { nick, pass })
          .then((data) => {
            if (data.code === 202) {
              this.$router.push('/');
              this.setToken(data.dataSet.token);
              this.setUserCard(data.dataSet.userCard);
              sessionStorage.setItem('userToken', data.dataSet.token);
              sessionStorage.setItem('userCard', JSON.stringify(data.dataSet.userCard));
            }
          })
        } else {
          this.$store.commit(
            'setAlertInfo',
            {
              color: 2,
              msg: '请填写完整信息',
          });
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
              this.allowLogin = true;
            } else {
              this.tip.verific = '❌ 验证码错了欸';
              this.allowLogin = false;
            }
          });
        } else {
          this.tip.verific = '* 此为必填项';
        }
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
        }
        this.tip.pass = txt;
      },
      again(e) {
        e.target.src = 'http://127.0.0.1:7001/getCode?cd=' + Math.random();
      }
    },
  }
</script>

<style scoped>
.disable {
  cursor: not-allowed;
  animation: '';
}
</style>