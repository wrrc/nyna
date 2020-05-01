<template>
  <div class="box" style="margin: 0 5%;width: 90%;">
    <div class="editor-header">
      <button class="btn" @click="back">返回</button>
      <button class="btn">提交</button>
    </div>
    <mavon-editor class="editor" ref="md" :ishljs="true" :boxShadow="false" @imgAdd="imgAdd" @imgDel="imgDel"
    transition="transition" :toolbarsBackground="'#f9f9f9'" :previewBackground="'#fffafa'" placeholder="开始编辑吧" :autofocus="true" v-model="val" style="z-index: 10 !important;min-height: 600px;width: inherit;"></mavon-editor>
  </div>
</template>

<script>
  export default {
    name: 'wr-mark',
    data() {
      return {
        val: '',
        transition: true,
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      imgAdd(fileName, imgFile) {
        console.log('imgAdd -> imgFile', imgFile)
        console.log('imgAdd -> fileName', fileName)
        let formData = new FormData();
        formData.append('image', imgFile);
        axios.post(
          '/uploadImg',
          {
            data: formData,
          },
          {
            'Content-Type': 'multipart/form-data',
          }
        ).then((data) => {
          console.log(data);
        })
      },
      imgDel() {}
    },
  }
</script>

<style scoped>
.editor-header {
  width: inherit;
  padding: 6px 0;
  display: flex;
  justify-content: flex-start;
  background: #f9f9f9;
}

.editor {
  z-index: 10;
}
</style>