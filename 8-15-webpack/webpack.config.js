/*
 * 1. 创建一个 demo 文件夹
 * 2. npm init 初始化工程，会生成 node_modules 文件夹和 package.json 配置文件
 * 3. npm install webpack --save-dev 在本地局部安装 webpack
 *    npm install webpack-cli --save-dev 在本地局部安装 webpack-cli
 * 4. npm install webpack-dev-server --save-dev 同样在本地局部安装 webpack-dev-server
 * 注：本地局部安装的配置在 package.json 中
 *    "devDependencies": {
 *          "webpack": "^4.16.5",
            "webpack-dev-server": "^3.1.5"
 *    }
 *
 * 5. 在 package.json 的 scripts 中添加一个快速启动 webpack-dev-server 服务的脚本
 *    "dev": "webpack-dev-server --open --config webpack.config.js"
 * 6. 当运行 npm run dev 时, 会执行配置的命令，--config 指向的配置文件就是本文件，--open 会在执行时自动在浏览器打开页面，
 *    默认地址是 127.0.0.1:8080 IP 和端口也是可以配置的 --host 192.168.10.1 --port 8181
 * 7. webpack 配置中最重要的也是必选的两项是入口(Entry)和出口(Output)，入口的作用是告诉 webpack 从哪里开始寻找依赖，并且编译，
 *    出口则用来配置编译后的文件存储位置和文件名
 * 8. 开始逐步完善 webpack 的配置，通过配置 loaders 来编译处理不同后缀的文件，此时的 css 文件编译进了输出文件 /dist/main.js 中，
 *    在项目中以 style 标签的形式加载（js 会被 css 撑大， 不利于缓存）
 *    npm install css-loader --save-dev
 *    npm install style-loader --save-dev
 * 9. 针对第八条的问题，可以使用插件来完成，将所有的 css 打包成一个 main.css 文件，通过 link 的方式引入
 *    npm install extract-text-webpack-plugin --save-dev
 */

// nodeJs 的 path 模块 是一个路径小工具
var path = require('path');
// 导入插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var Config = {
    entry: {
        main: './main'
    },
    output: {
        // path.join() 此方法是为了正确使用当前系统的路径分隔符 unix 是 '/' windows 是 '\'
        // __dirname 是当前文件所在目录的完整目录（绝对路径） __filename 当前模块文件的完整绝对路径文件名
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    // 添加 loader 来对不同的文件进行处理，在 rules 中指定一系列的 loaders 每个 loader 必须包含 test 和 use 两个选项
    // 当 webpack 在编译过程中遇到 require 或 import 导入一个后缀为 .css 的文件时，先通过 css-loader 再通过 style-loader 转换
    module: {
        rules: [
            {
                // 正则以 .css 结尾的文件
                test: /\.css$/,
                /* 基本写法
                use: [
                    'style-loader',
                    'css-loader'
                ]
                */
                //  这种写法有问题！！！
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        // 重命名提取后的 css 文件
        new ExtractTextPlugin('main.css')
    ]
};
// module.exports 相当于 export default 由于目前还没有安装支持 ES6 的编译插件，因此不能直接使用 ES6 语法
module.exports = Config;
// webpack-dev-server 具有热更新功能，通过建立一个 websocket 连接来实时响应代码的修改

// package-lock.json 的作用是用来锁定大版本，保证在 npm install 的时候大家的依赖是一致的
