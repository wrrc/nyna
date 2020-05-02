import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/type',
    name: 'Type',
    component: () => import('../views/Type.vue')
  },
  {
    path: '/friendsLink',
    name: 'FriendsLink',
    component: () => import('../views/FriendsLink.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/write',
    name: 'Write',
    component: () => import('../views/Write.vue'),
    beforeEnter: (to, from, next) => {
      const token = sessionStorage.getItem('userToken');
      if (token) {
        next();
      } else {
        Store.commit('setAlertInfo', {
          color: 2,
          msg: '您还没有登录...',
        })
        next({ path: '/login' });
      }
    }
  },
  {
    path: '*',
    name: 'NotFind',
    component: () => import('../views/NotFind.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
