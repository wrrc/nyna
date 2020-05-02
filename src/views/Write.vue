<template>
  <div class="box">
    <div class="editor-header">
      <div class="enter-input">
        <input type="text" v-model="from.title" class="inputc" placeholder="输入标题" />
        <span></span>
      </div>
      <div class="enter-input" @mouseenter="showList" @mouseleave="hideList">
        <input type="text" v-model="articleType" class="inputc add-select" placeholder="请选择分类" />
        <ul class="float-option" :style="{ display: listShow ? 'inline' : 'none' }">
          <li v-for="(v, index) in category" :key="index" @click="liClick" :data-id="v.id">{{ v.title }}</li>
        </ul>
      </div>
      <!-- <button class="btn" @click="back">返回</button>
      <button class="btn">提交</button> -->
    </div>
      <mavon-editor class="editor" ref="md" :ishljs="true" :boxShadow="false" @imgAdd="imgAdd" @imgDel="imgDel" @save="save"
      transition="transition" :toolbarsBackground="'var(--bcy)'" :previewBackground="'#fffafa'" placeholder="开始编辑吧" :autofocus="true" v-model="val" style="z-index: 10 !important;height: 600px;max-height: 600px;" />
  </div>
</template>

<script>
  export default {
    name: 'wr-mark',
    data() {
      return {
        val: '',
        articleType: '',
        from: {
          title: '',
          classid: '',
          tag: [],
        },
        transition: true,
        listShow: false,
        category: [
          {
            id: '123',
            title: 'JavaScript',
          },
          {
            id: '456',
            title: 'HTML',
          },
          {
            id: '789',
            title: 'css',
          },
          {
            id: '741',
            title: '100',
          },
          {
            id: '852',
            title: '100',
          },
        ]
      }
    },
    methods: {
      showList() {
        this.listShow = !this.listShow;
      },
      hideList() {
        this.listShow = !this.listShow;
      },
      liClick(e) {
        this.from.classid = e.target.getAttribute('data-id');
        this.articleType = e.target.innerText;
      },
      back() {
        this.$router.go(-1);
      },
      imgAdd(pos, imgFile) {
        let formData = new FormData();
        formData.append('image', imgFile);
        formData.append('sizeid',123)
        axios({
          url: '/uploadImg',
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((data) => {
          if (data.code === 100) {
            this.$refs.md.$img2Url(pos, 'http://127.0.0.1:7001/'+data.dataSet);
          }
        })
      },
      imgDel(pos) {
        const imgName = pos[0].split('/').slice(3).join('/');
        axios({
          url: '/delImg',
          method: 'delete',
          data: { fname: imgName },
        })
        .then((data) => {
          if (data.code === 100) {
            console.log(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      },
      save(md, html) {

      }
    },
  }
</script>

<style scoped>
.editor-header {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  border-radius: var(--br);
  background: var(--bcw);
}

.float-option {
  /* width: 80%; */
  position: absolute;
  top: 30px;
  left: 10px;
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: var(--br);
  background: var(--bcw);
  box-shadow: var(--boxSha);
  z-index: 2000;
}

.float-option > li {
  padding: 3px 12px;
  border-radius: var(--br);
  color: var(--bcb);
  cursor: pointer;
  background: var(--bcw);
}

.float-option > li:hover {
  color: var(--bcw);
  background: var(--bcb);
  transition: all .3s ease;
}

.editor {
  z-index: 10;
}
</style>