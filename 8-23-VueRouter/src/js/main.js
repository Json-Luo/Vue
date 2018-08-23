import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../app.vue';
import Index from '../routers/index.vue';
import About from '../routers/about.vue';


const Routers = [
    {
        path: '/index',
        // 这样写的好处是不用在打开首页的时候一次性加载进来，而是在访问的时候才去加载
        // component: (resolve) => require(['../routers/index.vue'], resolve)
        component: Index
        // 访问首页的时候一次性加载
        //component: require('../routers/index.vue')
    },
    {
        path: '/about',
        // component: (resolve) => require(['../routers/about.vue'], resolve)
        component: About
    },
    {
        // 当访问的路径不存在的时候重定向到首页
        path: '*',
        redirect: '/index'
    }
];


const RouterConfig = {
    // 使用 HTML5 的 History 路由模式，通过 '/' 设置路由，如果不配置 mode 会使用 '#' 来设置路径，开启 history 路由，在生产环境服务端必须进行配置
    // 将所有路由都指向同一个 html，或设置 404 页面为该 html， 否则刷新页面会出现 404
    // 在 webpack-dev-server 中添加参数 --history-api-fallback 是将所有的路由都指向 index.html
    mode: 'history',
    routes: Routers
};

const router = new  VueRouter(RouterConfig);

Vue.config.debug = true;
let app = new Vue({
    el: '#app',
    router,
    render: createElement => createElement(App)
});
