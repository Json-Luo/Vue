/* 1. npm init
 * 2. npm intsall webpack --save-dev [还要安装 webpack-cli] npm install webpack-cli --save-dev
 * 3. dist 打包后端文件夹  src 各类资源文件夹
 * 4. webpack.config.js 是默认配置文件，也可以通过 --config 指定配置文件运行
 */

// 高版本的 webpack 必须借助 path 模块生成绝对路径
var path = require('path');

module.exports = {
    /*
     * 打包入口，有三种方式
     * 1. String 就指定一个入口文件，所有的依赖都引入到这个入口文件中
     * 2. Array 将两个平行不相干的文件打包在一起
     * 3. Object 一般用于多页面的文件打包  key 就是 chunk name value 可以是 string 也可以是 array
     */
    // entry: './src/script/main.js',
    // entry: [
    //     './src/script/main.js',
    //     './src/script/body.js'
    // ],
    entry: {
        // 两个 chunk 应该要输出两个打包文件
        main: './src/script/main.js',
        body: './src/script/body.js'
    },
    // 打包输出路径及文件名
    output: {
        /*
         * 1. 利用 path 模块生成绝对路径，不建议在 filename 中指定路径，路径由 path 来全权负责
         * 2. 当 entry 是多输入的时候，即有多个 chunk 的时候，我们可以使用占位符来区分打包输出文件，不然直接报错，只有当文件改变了之后，打包 hash 值才会发生变化，包括 chunkhash 也是如此
         *    [name]        chunk name
         *    [hash]        每次打包的 hash 值，多个 chunk 的打包 hash 值是一样的
         *    [chunkhash]   每个 chunk 的 hash 值
         */
        path: path.resolve(__dirname, './dist/js'),
        // filename: 'bundle.js'
        // filename: '[name]-[hash].js'
        filename: '[name]-[chunkhash].js'
    },
    // webpack 4.0 在配置文件中设置当前为开发模式下，打包文件不进行压缩
    mode: 'development'
};