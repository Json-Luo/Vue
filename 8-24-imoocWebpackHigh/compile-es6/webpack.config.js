/*
 *  babel-loader 仅仅只是对语法的转换
 *
 *  npm install babel-polyfill --save
 *  babel-polyfill 是一个全局垫片，会污染变量，适合用来开发业务代码，是对函数的转换，有些低版本的浏览器对于新函数的的支持不行，所以要用这个全局垫片来转换
 *  使用： 直接在文件中 import babel-polyfill
 *
 *  npm intsall babel-runtime --save
 *  npm install babel-plugin-transform-runtime --save-dev
 *  babel runtime transform 是一个局部垫片，不会污染变量，适合用来开发框架代码（例如 iview 的通用框架组件），是对函数的转换，有些低版本的浏览器对于新函数的的支持不行，
 *  所以要用这个局部垫片来转换
 *  使用： 在 .babelrc 中配置 "plugins": ["transform-runtime"]
 */

// es6 模块化语法
module.exports = {
    // 尽量使用 对象写法  key 就是 chunkname
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name]-[hash:8].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};