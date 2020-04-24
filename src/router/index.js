import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
