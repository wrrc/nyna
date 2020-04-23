<template>
  <div class="drop_from" :class="{showDown: hei}">
    <span @click="handleClosk" class="close">✖</span>
    <ul class="drop_item">
      <li v-for="(item, index) in navSet" :key="index">
        <router-link :to="item.nav_path">{{item.nav_name}}</router-link>
      </li>
      <li>
        <a href="">分享</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: '',
    methods: {
      handleClosk() {
        this.$store.commit({
          type: 'setIsDown',
          val: true,
        })
      },
    },
    computed: mapState({
      navSet: 'nav',
      hei: 'isDown'
    })
  }
</script>

<style scoped>
.drop_from {
  position: fixed;
  top: 0;
  padding: 6px;
  width: 98.5%;
  border-radius: 0 0 20px 20px;
  background-color: rgba(66, 66, 66, .9);
  text-align: center;
  z-index: 10;
  transition: all .3s ease;
}

.showDown {
  top: -224px;
}

.drop_from::after {
  content: "";
  filter: blur(5px);
}

.drop_item a {
  color: #fff;
}

.drop_item li {
  width: 85%;
  padding: 6px 12px;
}

.close {
  position: absolute;
  top: 1rem;
  right: 2rem;
  cursor: pointer;
}
</style>