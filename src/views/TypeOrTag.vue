<template>
  <div>
    <h1>分类</h1>
    <form>
      <input type="text" v-model="form.name" />
      <input type="text" v-model="form.password" />
      <input type="text" v-model="form.age" />
      <input type="text" v-model="form.sex" />
      <input type="text" v-model="form.job" />
      <input type="text" v-model="form.lastTime" />
      <button @click="handleClick">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
        age: '',
        sex: '',
        job: '',
        lastTime: '',
      }
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      console.log('object');
      axios({
        method: 'post',
        url: '/users',
        headers: {
          'X-XSRF-TOKEN': 'egg-mongo_1587173505279_9351',
        },
        data: this.form,
      })
      .then(res => console.log(res))
    },
  },
}
</script>