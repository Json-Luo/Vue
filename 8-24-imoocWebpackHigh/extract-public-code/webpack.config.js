/*
 * 提取公共代码的的插件已经内置在了 webpack 中
 * 所以首先我们要局部安装 webpack 全局的 webpack 相对来说就是一个打包工具，而我们这里要使用 webpack 内部的插件，所以要在本地安装 webpack 库
 * npm install webpack --save-dev
 *
 * todo: 由于版本问题，提取公共代码的插件改变了 webpack.optimize.CommonsChunkPlugin 已经被移除
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        /*  webpack 4 已经移除
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                // 出现两次就提取打包成公共文件
                minChunks: 2
            })
         */
    ],
    optimization: {
        splitChunks: {
            /*
             * chunks: 表示显示块的范围，三个可选值 initial: 初始块   async: 按需加载块  all: 所有块  默认 all
             * minSize: 表示在压缩前的最小模块大小，默认为30000 字节 即 30kb
             * minChunks: 表示被引用次数，默认1
             * maxAsyncRequests: 最大的按需(异步)加载次数，默认为1
             * maxInitialRequests: 最大的初始化加载次数，默认为1
             * name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成
             * automaticNameDelimiter: 自动命名连接符
             * cacheGroups: 缓存组
             */
            chunks: 'all',
            minSize: 1,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            // automaticNameDelimiter: '~',
            // cacheGroup 自定义配置，主要用来决定生成的文件
            cacheGroups: {
                // 通过default:false禁用默认的缓存组，然后就可以自定义缓存组，将初始化加载时被重复引用的模块进行拆分
                default: false,
                /*
                 * 自定义缓存组，可以重写上面的配置
                 * test: 限制范围，正则匹配文件夹或文件
                 * name: 打包生成的文件名
                 * priority: 优先级
                 * reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块
                 */
                commons: {
                    name: 'common',
                    minSize: 123, // todo: 由于版本问题，与视频不符，为什么 123 就可以  124 就不行？？
                    minChunks: 2,
                    priority: 0,
                    // reuseExistingChunk: true
                }
            }
        }
    },
    mode: 'development'
};