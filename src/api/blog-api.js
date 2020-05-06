'use strict';

import axios from '../plugins/axios';
import vm from '../main';

const BlogApi = {
  // 获取邮箱验证码
  async reqCode(email) {
    return await axios
      .post(
        '/getEmailCode',
        { email }
      )
  },
  // 注册

  // 登录
  async login(nick, pass, verific) {
    const res = await vm.axios.post('/login', { nick, pass, verific });
    if (res.code === 202) {
      vm.$router.push('/');
      vm.$store.commit('setToken', res.dataSet);
      sessionStorage.setItem('userToken', res.dataSet);
    }
  }
};

export default BlogApi;