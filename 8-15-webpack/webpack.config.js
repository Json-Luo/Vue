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
 */

var path = require('path');

var Config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    }
};
// module.exports 相当于 export default 由于目前还没有安装支持 ES6 的编译插件，因此不能直接使用 ES6 语法
module.exports = Config;
// webpack-dev-server 具有热更新功能，通过建立一个 websocket 连接来实时响应代码的修改

// package-lock.json 的作用是用来锁定大版本，保证在 npm install 的时候大家的依赖是一致的
