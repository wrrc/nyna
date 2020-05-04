<template>
  <wr-mode>
    <div class="mode-header" style="display: flex;justify-content: flex-end;">
      <button class="btn" @click="tagClose">✖</button>
    </div>
    <div class="mode-content">
      <Select @pushCalss="getClass" />
      <div class="enter-input">
        <input type="text" class="inputc" v-model="name" placeholder="新的标签名..." />
        <span></span>
      </div>
      <div class="enter-input">
        <input type="text" class="inputc" v-model="desc" maxlength="30" placeholder="为了让其他人也容易了解，请填写描述" />
        <span></span>
      </div>
    </div>
    <div class="mode-footer">
      <button class="btn" @click="addTag">(👉ﾟヮﾟ)👉</button>
    </div>
  </wr-mode>
</template>

<script>
  import Select from '@/components/Select.vue';
  import { mapMutations } from 'vuex';

  export default {
    name: 'add-tag',
    components: { Select },
    data() {
      return {
        name: '',
        desc: '',
        calssId: '',
      }
    },
    methods: {
      ...mapMutations({
        tagClose: 'setAddTagMode',
        setAlertInfo: 'setAlertInfo',
        setTags: 'setTags',
      }),
      addTag() {
        if (this.name && this.desc && this.calssId) {
          axios.post('/tags', {
            name: this.name,
            desc: this.desc,
            cgid: this.calssId,
          })
          .then(res => {
            if (res.code === 100) {
              const nowTags = JSON.parse(sessionStorage.getItem('tags'));
              const { tag_gid, name: tag_name } = res.dataSet;
              nowTags.push({ tag_gid, tag_name });
              sessionStorage.setItem('tags', JSON.stringify(nowTags));
              this.setTags(nowTags);
              this.tagClose();
            }
          })
        } else {
          this.setAlertInfo({
            color: 2,
            msg: '请填写完整信息'
          })
        }
      },
      getClass(id) {
        this.calssId = id;
      }
    },
  }
</script>

<style scoped>

</style>