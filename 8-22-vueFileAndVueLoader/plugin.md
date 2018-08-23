```js
MyPlugin.install = function(Vue, options) {
  // 全局注册组件（指令类似）  
  Vue.component('component-name', {
      // 组件内容
  })
  // 添加实例方法
  Vue.prototype.$Notice = function() {
    // 逻辑
  }
  // 添加全局方法或属性
  Vue.globalMethod = function() {
    // 逻辑
  }
  // 添加全局混合
  Vue.mixin({
    mounted: function() {
      // 逻辑
    }
  })
}

// 通过 Vue.use() 来使用插件
Vue.use(MyPlugin)
// 或者
Vue.use(MyPlugin, {
    // 参数
})

// 一般情况下，开发插件都是通过 npm 发布后给别人使用的
```