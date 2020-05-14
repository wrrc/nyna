import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/regist',
    name: 'Regist',
    component: () => import('../views/Registered.vue'),
    children: [
      {
        path: '/regist/',
        name: 'SendCode',
        component: () => import('../components/SendCode.vue')
      },
      {
        path: '/regist/fill',
        name: 'FillInfo',
        component: () => import('../components/FillInfo.vue'),
        beforeEnter: (to, from, next) => {
          console.log(from);
          if (from.path !== '/regist') {
            next({ name: 'NotFind' });
          } else {
            next();
          }
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      document.getElementById('readyBlur').classList.remove('blur-scale-no', 'blur-scale-yes');
      next();
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/article',
    name: 'Article',
    component: () => import('../views/OutArticle.vue')
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
