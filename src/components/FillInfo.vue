<template>
  <div>
    <div class="mode-header">
      <button class="btn" @click="close">返回</button>
    </div>
      <div style="display: flex;flex-flow: row nowarp;">
        <div class="user-card">
          <img class="user-img" ref="userImg" :src="img" alt="头像" />
          <div class="user-info">
            <p class="h4" style="font-weight: bold;">{{ froms.nick }}</p>
            <p style="margin-top: 5px;font-size: small;color: rgba(0,0,0,.8);">{{ froms.desc }}</p>
          </div>
        </div>
        <div class="mode-content">
          <input type="file" class="inputc" ref="getAvatar" @change="showAvatar"/>
          <div class="enter-input">
            <span style="margin-right: 3em;">我是</span>
            <label for=""><input type="radio" value="1" v-model="froms.sex" name="sex" tooltip="男" placement="top" />‍🧙‍♂️</label>
            <label for=""><input type="radio" value="0" v-model="froms.sex" name="sex" tooltip="女" placement="top" />🧙‍♀️</label>
          </div>
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
            <input type="password" @blur="passiBlur" v-model.trim="froms.passi" class="inputc" placeholder="重复密码" />
            <span></span>
          </div>
          <span class="tip">{{ tip.passi }}</span>
          <textarea class="inputc" rows="2" v-model.trim="froms.desc" placeholder="留下自己的个签吧"></textarea>
        </div>
      </div>
    <div class="mode-footer">
      <button class="btn" @click="handleRegist">(👉ﾟヮﾟ)👉</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        img: 'http://127.0.0.1:7001/public/uploadImgs/1577015971518.jpeg',
        froms: {
          email: '',
          nick: '',
          sex: '',
          pass: '',
          passi: '',
          desc: '',
        },
        tip: {
          nick: '',
          pass: '',
          passi: '',
        }
      }
    },
    created() {
      this.froms.email = this.$route.params.email;
    },
    methods: {
      close() {
        this.$router.push('/login');
      },
      showAvatar() {
        let file = this.$refs.getAvatar.files[0];
        this.$refs.userImg.src = URL.createObjectURL(file);
      },
      sendImg() {
        const datas = new FormData();
        datas.append('img', this.$refs.getAvatar.files[0]);
        return new Promise((reslove, reject) => {
           axios
            .post('/saveAvatar', datas)
            .then(res => {console.log(res);});
        })
      },
      handleRegist() {
        const { email, nick, sex, pass, passi, desc } = this.froms;
        const datas = new FormData();
        datas.append('email', email);
        datas.append('nick', nick);
        datas.append('sex', sex);
        datas.append('pass', pass);
        datas.append('desc', desc);
        datas.append('file', this.$refs.getAvatar.files[0]);
        if (email && nick && sex && pass && passi) {
          axios.post('/regist', datas, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((data) => {
            if (data.code === 201) {
              this.$router.push('/login');
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
        } else if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/.test(this.froms.pass)) {
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
    },
  }
</script>

<style scoped>
.user-card {
  padding-left: 48px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.user-info {
  margin-top: 15px;
  display: flex;
  flex-flow: column nowrap;
}

.user-img {
  height: 20vh;
  border-radius: 50%;
  box-shadow: var(--boxSha);
}
</style>