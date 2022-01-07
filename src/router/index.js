import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Services from "../views/Services.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Services',
        component: Services
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = JSON.parse(localStorage.getItem('vuex'))?.user.data.token;
  if (!['SignIn', 'SignUp'].includes(to.name) && !token) next({ name: 'SignIn' });
  else if (['SignIn', 'SignUp'].includes(to.name) && token) next ({ name: 'Services' });
  else next();
});

export default router;
