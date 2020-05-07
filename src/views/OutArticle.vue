<template>
  <div class="box">
    <h3>{{ a.article_title }}</h3>
    <!-- <hr style="width: 60%;" /> -->
    <mavon-editor
      class="md"
      :value="a.article_content"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
      :boxShadow="false"
    ></mavon-editor>
  </div>
</template>

<script>
  export default {
    name: 'wr-out-article',
    data() {
      return {
        a: {
          article_title: '',
          article_content: '',
          article_gid: '',
          article_keep: 0,
          article_look: 0,
          article_release_time: '',
          blog_user: {
            user_gid: '',
            user_avatar: '',
            user_name: '',
            user_introduction: '',
          },
        }
      }
    },
    beforeCreate() {
      axios
        .get('/article/' + this.$route.params.id)
        .then(({ dataSet }) => {
          this.a = dataSet;
        })
    }
  }
</script>

<style scoped>
.md {
  width: 60%;
  border-radius: var(--br);
}
</style>