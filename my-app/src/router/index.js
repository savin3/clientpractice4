import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import('../components/Products.vue');
    },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../components/Login.vue');
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import('../components/Register.vue');
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/cart',
    name: 'cart',
    component: function () {
      return import('../components/Cart.vue');
    },
    beforeEnter: ifAuthenticated,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
