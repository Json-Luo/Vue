import Vue from 'vue'
import Router from 'vue-router'
// 用不到则删除掉
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      // 动态加载 @ 符号表示 src 目录，在配置文件中可以配置，中间的注释是可以在打包的过程中看到
      component: () => import(/* webpackChunkName: 'home' */'@/pages/Home')
    },
    {
      path: '/todos',
      name: 'Todos',
      component: () => import(/* webpackChunkName: 'todos' */'@/pages/Todos')
    }
  ]
})
