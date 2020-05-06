<template>
  <div class="enter-input" @mouseenter="showList" @mouseleave="hideList">
    <input type="text" v-model="articleType" class="inputc add-select" placeholder="选择一个分类吧" />
    <ul class="float-option" v-show="listShow">
      <li v-for="(v, index) in classes" :key="index" @click="liClick" :data-id="v.class_gid">{{ v.class_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    name: 'wr-select',
    data() {
      return {
        articleType: '',
        listShow: false,
        classId: '',
      }
    },
    computed: mapState([
      'classes'
    ]),
    methods: {
      showList() {
        this.listShow = true;
      },
      hideList() {
        this.listShow = false;
      },
      liClick(e) {
        this.listShow = false;
        this.classId = e.target.getAttribute('data-id');
        this.articleType = e.target.innerText;
        this.$emit('pushCalss', this.classId);
      },
    }
  }
</script>

<style scoped>
.float-option {
  /* width: 80%; */
  position: absolute;
  top: 30px;
  left: 30px;
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