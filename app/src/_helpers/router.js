import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/Chat.vue'),
    },
    {
      path: '/recovery',
      name: 'recovery-password',
      component: () => import('@/views/RecoveryPassword.vue'),
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register', '/recovery'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if(authRequired && !loggedIn) {
    return next('/login');
  } else if (!authRequired && loggedIn) {
    return next('/chat');
  }

  next();
});