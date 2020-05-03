<template>
  <div class="box" style="padding-top: 20px;">
    <div class="editor-sidebar" style="background: var(--bcy);">
      <div class="enter-input">
        <input type="text" v-model="title" class="inputc" placeholder="输入标题" />
        <span></span>
      </div>
      <div class="summarys" style="background: var(--bcy);">
        <span class="selected">最多五个标签，让你的文章更清晰</span>
        <span class="selected be-selected" v-for="(v, index) in chosen" :key="index" @click="delThis(index)">{{ v.tag_name }}</span>
      </div>
      <div class="summarys">
        <button class="selected to-selected">创建</button>
        <button class="selected to-selected" v-for="(v, index) in tags" :key="index" @click="addToSelect(index)">{{ v.tag_name }}</button>
      </div>
    </div>
      <mavon-editor class="editor" ref="md" :ishljs="true" :boxShadow="false" @imgAdd="imgAdd" @imgDel="imgDel" @save="save"
      transition="transition" :toolbarsBackground="'var(--bcy)'" :previewBackground="'#fffafa'" placeholder="开始编辑吧" :autofocus="true" v-model="val" style="height: 600px;max-height: 600px;" />
  </div>
</template>

<script>
  export default {
    name: 'wr-mark',
    data() {
      return {
        val: '',
        title: '',
        tags: [],
        chosen: [],
        transition: true,
      }
    },
    created() {
      this.tags = JSON.parse(sessionStorage.getItem('tags'));
      if (!this.tags) {
        axios
        .get('/tags')
        .then((res) => {
          this.tags = res;
          sessionStorage.setItem('tags', JSON.stringify(res));
        })
      }
    },
    methods: {
      addToSelect(i) {
        if (this.chosen.length < 5) {
          const [ item ] = this.tags.splice(i, 1);
          this.chosen.push(item);
        }
      },
      delThis(i) {
        const [ item ] = this.chosen.splice(i, 1);
        this.tags.push(item);
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
        const tags = this.chosen.map((e) => {
          return e.tag_gid;
        });
        axios
          .post('/article',
            {
              title: this.title,
              tags,
              md
            },
          )
          .then((res) => {
            console.log(res, 'EEEEE');
          });
      }
    },
  }
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: row;
}

.editor-sidebar {
  max-width: 20%;
  /* height: 600px; */
  max-height: 600px;
  display: flex;
  align-self: start;
  flex-direction: column;
  border-radius: var(--br);
  background: var(--bcw);
}

.summarys {
  display: flex;
  flex-wrap: wrap;
  padding: 6px 15px;
  /* overflow-y: scroll; */
  border-radius: var(--br);
  background-color: var(--bcw);
}

.selected {
  padding: 6px 12px;
  margin: .2rem;
  border-radius: var(--br);
  font-weight: 600;
  font-size: x-small;
  cursor: pointer;
}

.to-selected {
  color: var(--bcb);
  border: 1px dashed;
  background-color: var(--bcw);
  animation: move-out .3s forwards;
}

@keyframes move-out {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes move-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.to-selected::after {
  content: "➕";
  margin-left: 5px;
}

.be-selected {
  color: var(--bcw);
  background-color: var(--bcb);
  animation: move-in .3s;
}

.be-selected::after {
  content: "✖";
  margin-left: 5px;
}
</style>