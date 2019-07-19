import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Reg from '@/pages/reg'
import Release from '@/pages/release'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },{
      path: '/release',
      name: 'release',
      component: Release
    },{
      path: '/xxx',
      name: 'xxx',
      component: Release
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/reg',
      name: 'reg',
      component: Reg
    }
  ]
})
