<template>
  <div>
    <div class="mode-header">
      <button class="btn" @click="close">返回</button>
    </div>
    <form class="mode-content">
      <p class="h5" style="text-align: center;">
        验证码有效时间只有三分钟...
      </p>
      <div class="enter-input">
        <input type="email" pattern="/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/" @blur="emailBlur" v-model.trim="froms.email" class="inputc" placeholder="邮箱" />
        <span></span>
      </div>
      <span class="tip">{{ tip.email }}</span>

      <div class="enter-input">
        <input type="text" v-model.trim="code" class="inputc" maxlength="6" placeholder="验证码" />
        <span></span>
        <button @click.prevent="reqCode" :disabled="disable" :class="{ 'btn': true, 'btn-await': disable}">发送验证码</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disable: false,
        timre: null,
        delay: 180000,
        froms: {
          email: 'binghuaziyun1998@163.com',
        },
        tip: {
          email: '',
        },
        code: '',
      }
    },
    watch: {
      code(newValue, oldValue) {
        if (newValue.length === 6) {
          axios
            .get('/valiEmailCode', {
              params: { code: newValue }
            })
            .then((res) => {
              if (res.code === 100) {
                this.$router.push({
                  name: 'FillInfo',
                  params: {
                    email: this.froms.email,
                  }
                });
              }
            })
        }
      },
    },
    methods: {
      close() {
        this.$router.go(-1);
      },
      reqCode(e) {
        if (this.froms.email) {
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
              }
            })
        } else {
          this.$store.commit(
              'setAlertInfo',
              {
                color: 2,
                msg: '邮箱格式不正确。',
            });
        }
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
    },
  }
</script>

<style scoped>
.btn-await {
  cursor: wait;
  animation: '';
}
</style>