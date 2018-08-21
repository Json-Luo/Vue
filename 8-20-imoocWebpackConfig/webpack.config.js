/* 1. npm init
 * 2. npm intsall webpack --save-dev [还要安装 webpack-cli] npm install webpack-cli --save-dev
 * 3. dist 打包后端文件夹  src 各类资源文件夹
 * 4. webpack.config.js 是默认配置文件，也可以通过 --config 指定配置文件运行
 */

// 高版本的 webpack 必须借助 path 模块生成绝对路径
var path = require('path');
// 建立对插件的引用 此插件的作用就是自动将打包好的文件引入页面 而无需人工引入
var htmlWebpackPlugin = require('html-webpack-plugin');

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
        body: './src/script/body.js',
        // 演示多页面应用
        page1: './src/script/page1.js',
        page2: './src/script/page2.js',
        page3: './src/script/page3.js',
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
        path: path.resolve(__dirname, './dist'),
        // filename: 'bundle.js'
        // filename: '[name]-[hash].js'
        filename: 'js/[name]-[chunkhash].js',
        // 上线地址占位符， 所有的文件都会被替换成线上域名地址
        publicPath: 'http://cdn.com/',
    },
    // webpack 4.0 在配置文件中设置当前为开发模式下，打包文件不进行压缩
    mode: 'development',
    // 插件的使用的数据是一个 array
    plugins: [
        new htmlWebpackPlugin({
            // 其实有个上下文 context 的概念，默认就是当前运行脚本目录，所以 template 指向的是根目录下的 index.html 由于插件也会读取 output，所以给 js 打包文件添加相对路径，而默认的 index.html 则生成在 dist 文件下
            template: 'index.html',
            // 插件也可以指定生成文件名，也可以使用占位符，这个 hash 如果源文件没发生改变也是不会变的 ( 即版本号 ) 为了测试方便，使用唯一名字来回覆盖，不然分不清楚生成了哪个 hash
            // filename: 'index-[hash].html',
            filename: 'index.html',
            // 指定引入打包的 js 具体放在哪个标签里面，默认是 body 标签
            // inject: 'head',
            inject: false,
            // 给打包页面传递参数 html 页面中通过 <%= htmlWebpackPlugin.options.title %> 来获取 title 参数
            title: 'webpack is good!',
            date: new Date(),
            //  遍历的 html-webpack-plugin 的所有参数之后，我们可以通过 htmlWebpackPlugin.files.chunks.main.entry 来获取打包后的 js 引用，可以将 js 放在任何我们想要的位置 inject 的值会影响，注意改成 false
            // minify 的作用是对 html 文件进行压缩
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                collapseWhitespace: true
            }
        }),
        //  生成多页面 html， 只要再调用一次即可
        new htmlWebpackPlugin({
            filename: 'page1.html',
            template: 'pages.html',
            // 为了提高性能 不需要直接载入 chunks
            inject: false,
            title: 'this is page one',
            // 默认引入了所有的 js 但是我们通过 chunks 参数来只引入 main 和 page1 两个 js
            // chunks: ['main', 'page1'],
            // 如果包含大多数的 chunks 的话，可以通过 excludeChunks 参数来排除其他少数 chunks
            excludeChunks: ['page2', 'page3', 'body'],
        }),
        new htmlWebpackPlugin({
            filename: 'page2.html',
            template: 'pages.html',
            inject: false,
            title: 'this is page two',
            // chunks: ['main', 'page2'],
            excludeChunks: ['page1', 'page3', 'body'],
        }),
        new htmlWebpackPlugin({
            filename: 'page3.html',
            template: 'pages.html',
            inject: false,
            title: 'this is page three',
            // chunks: ['main', 'page3'],
            excludeChunks: ['page1', 'page2', 'body'],
        }),
    ]
};