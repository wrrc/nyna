<template>
  <div class="enter-input" @mouseenter="showList" @mouseleave="hideList">
    <input type="text" v-model="articleType" class="inputc add-select" placeholder="选择一些标签吧" />
    <ul class="float-option" :style="{ display: listShow ? 'inline' : 'none' }">
      <li v-for="(v, index) in category" :key="index" @click="liClick" :data-id="v.id">{{ v.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'wr-select',
    data() {
      return {
        articleType: '',
        category: [
          {
            id: '123',
            title: '前端',
            child: [
              {
                id: '456',
                title: '后端',
              },
              {
                id: '456',
                title: '后端',
              },
              {
                id: '456',
                title: '后端',
              },
              {
                id: '456',
                title: '后端',
              },
              {
                id: '456',
                title: '后端',
              },
            ]
          },
          {
            id: '456',
            title: '后端',
          },
          {
            id: '789',
            title: '数据库',
          },
          {
            id: '741',
            title: '运维',
          },
          {
            id: '852',
            title: '工具',
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
    }
  }
</script>

<style scoped>
.float-option {
  /* width: 80%; */
  position: absolute;
  top: 30px;
  left: 10px;
  padding: 6px 12px;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  border-radius: var(--br);
  background: var(--bcw);
  box-shadow: var(--boxSha);
  z-index: 2000;
}

.float-option > li {
  padding: 3px 12px;
  font-size: .8rem;
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
</style>