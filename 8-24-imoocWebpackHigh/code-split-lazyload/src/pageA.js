/*
 *  import './subPageA';
 *  import './subPageB';
 *
 *  根据不同的机制来加载不同的模块，分别动态打包到不同的 chunk
 *  我们可以将 subPageA 和 subPageB 中的公共模块提前 require.include 到 pageA 中来，减少打包量，其实这样会将 moduleA 和 pageA 打包到一块，
 *  显然跟 pageA 打包到一块不符合我们的需求，所以我们要使用 optimization.splitChunks.cacheGroups 来提取公共部分，然后把公共部分打包成一个 chunk
 */
// require.include('./moduleA');

let page = '';
if (page === 'subPageA') {
    // 第一个参数仅仅只是引入，真正执行是在 require 的时候发生的
    // require.ensure(['./subPageA'], () => {
    //     let pageA = require('./subPageA')
    // }, 'subPageA')

    /*
     * webpack 3 支持 import 来动态引入，在引入的时候就已经执行了，在动态引入的模块前面添加注释达到添加 chunk name 的目的，否则chunk name 为 0,1,2...
     * 假如多个模块指定同一个 chunk name 的话，这几个模块会被打包到一起
     */
    import(/* webpackChunkName: 'subPageA' */'./subPageA').then((subPageA) => {
        console.log('sub page A has be required!')
    })
} else {
    // require.ensure(['./subPageB'], () => {
    //     let pageB = require('./subPageB')
    // }, 'subPageB')

    import(/* webpackChunkName: 'subPageB' */'./subPageB').then((subPageB) => {
        console.log('sub page B has be required!')
    })
}

/*
 * 修改之前 import * as _ from 'lodash';
 * 代码分割和懒加载  param1: ['lodash'] 同步加载，但是不会运行模块中的内容，只是包含过来而已  param1: [] 异步加载  此时是异步加载 lodash
 * 这样会异步加载 lodash 并且将 lodash 打包到一个 chunk 中，实现了第三方包与业务代码的分离
 */
require.ensure([], function () {
    let _ = require('lodash');
    _.join([1, 2], '3');
}, 'lodash');


export default 'pageA';