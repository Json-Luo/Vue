/*
 * typescript 是 javascript 的超集， typescript 包含 javascript
 *
 * webpack 打包 typescript
 * 官方 loader ： npm install typescript ts-loader --save-dev
 * 第三方loader： npm install typescript awesome-typescript-loader --save-dev ( 作者声称要比官方的 loader 来的快)
 *
 * 要使用 typescript 的话，就要在根目录下创建 tsconfig.json 的配置文件 [ http://www.typescriptlang.org/docs/handbook/tsconfig-json.html ]，
 * 还有要在 webpack 中进行相应的配置
 *
 * 在使用 typescript 时还会用到 js 工具库 lodash
 * npm install lodash --save-dev
 * 方法1：安装 lodash 的声明文件，这样在编写和打包的时候，语法参数错误时会报错，否则不会有任何错误提示
 * npm install @types/lodash --save-dev
 * 方法2：安装 typings 工具 注意必须要全局安装
 * npm install typings -g
 *      使用 typings 安装 lodash 声明文件，根目录会多出一个 typings.json 配置文件，和一个 typings 目录，目录里面就是安装的工具的声明文件
 *      typings install lodash
 * 实际上所有的 @types/lodash 都是安装在 node_modules/@types/ 目录下的，方法一中中间就是安装在了默认路径下，所以就无需指定目录，在方法二中间换了一个目录 typings,
 * 所以我们要使用声明文件来进行提示的时候要在 tsconfig.json 中 compilerOptions 下指定 typeRoots: ["./node_modules/@types", "./typings/modules"]
 *
 */

module.exports = {
    entry: {
        app: './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                }
            }
        ]
    },
    mode: 'development'
};