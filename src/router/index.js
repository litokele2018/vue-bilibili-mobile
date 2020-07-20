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
    title: '个人主页',
    needToken: true
  }
},
{
  path: '/edit',
  name: 'Edit',
  component: () => import( /* webpackChunkName: "Profile" */ '../views/Edit.vue'),
  meta: {
    title: '个人资料',
    needToken: true
  }
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let id = localStorage.getItem('id')
  let token = localStorage.getItem('token')

  if ((!id || !token) && to.meta.needToken) {
    router.push('/login')
    return
  }
  if (id && token && (to.path == '/login' || to.path == '/register')) {
    router.push('/profile')
    return
  }
  next()
})

export default router