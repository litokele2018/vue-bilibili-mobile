import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登陆'
  }
},
{
  path: '/register',
  name: 'Register',
  component: () => import( /* webpackChunkName: "Register" */ '../views/Register.vue'),
  meta: {
    title: '注册'
  }
},
{
  path: '/profile',
  name: 'Profile',
  component: () => import( /* webpackChunkName: "Profile" */ '../views/Profile.vue'),
  meta: {
    title: '个人主页'
  }
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if ((!localStorage.getItem('id') || !localStorage.getItem('token')) && (to.path !== '/login')) {
    router.push('/login')
  }
  next()
})

export default router