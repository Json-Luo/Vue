/*
 *  使用 loader 的三种方式
 *  1. 在 require 的时候在文件前面添加 loader  e.g.  require('css-loader!./style.css')
 *  2. 在 webpack 的配置中设置
 *  3. 在 cli 中使用 loader  e.g.  webpack --module-bind "css=style-loader!css-loader"
 */
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
    },
    // 在配置文件中使用 loader
    module: {
        // 在 webpack 4.0 中使用 rules 而不是 loaders
        rules: [
            {
                /*
                 * test 指定文件规则 以 js 结尾  安装解析 ES6 的 babel loader: npm install babel-loader babel-core --save-dev
                 * 给 loader 传递参数的也有三种方式 ( 对应使用 loader 的三种方式 )
                 *    1. require 的时候传递参数 e.g.  require("url-loader?mimetype=image/png!./file.png")
                 *    2. 在配置文件中指定 { test: /\.png$/, loader: "url-loader?mimetype=image/png"}
                 *                 或者 {
                 *                          test: /\.png$/,
                 *                          loader: "url-loader",
                 *                          query: { mimetype: "image/png" }
                 *                      }
                 *    3. 在 cli 中指定 e.g. webpack --module-bind "png=url-loader?mimetype=image/png"
                 */
                test: /\.js$/,
                // 在高版本中 loader 使用 use 代替，值可以是 string、array、object
                // use: {
                //     loader: 'babel-loader',
                //     query: {
                //         presets: ["latest"]
                //     }
                // },
                loader: 'babel-loader',
                // babel 转换语法其实很耗时，所以我们可以优化一些东西，就是 node_modules 目录下打包好的 js 文件过滤掉，不进行 babel 处理，务必要使用绝对路径
                exclude: path.resolve(__dirname, 'node_modules'),
                // babel 只处理 src 目录下的 js 文件
                include: path.resolve(__dirname, 'src'),
                query: {
                    /*
                     * 给 babel 指定 presets 的三种方式
                     * 1. 该插件参数的作用就是让 babel 按照什么样子来处理我们的 js 文件，latest 就是最新的 使用所有特性， 也可以是 ES2015 但是那样的话有些特性不支持
                     * presets 其实是一个插件 所以要安装该插件  npm install babel-preset-latest --save-dev
                     * 2. 我们也可以通过另外一种方式来指定 presets 配置，在项目根目录创建一个 .babelrc 文件，文件内容就是 { presets: ["es2015"] }
                     * 3. 在 package.json 中指定 presets  e.g.  "babel": {
                     *                                            "presets": ["es2015"]
                     *                                         }
                     */
                    // presets: ['es2015'],
                    presets: ['latest']
                }
            },
            {
                /*
                 * 由于一些新的 css 特性各个浏览器的支持情况不同，所以我们要借助第三方工具 postcss-loader 来处理
                 * 1. 首先安装 npm install postcss-loader --save-dev 后处理 css 需要使用到的一个插件 autoprefixer
                 * 2. 安装 plugin: npm install autoprefixer --save-dev
                 */
                test: /\.css$/,
                /*
                 *  loader 的处理方式是 从右到左 依次执行相应 loader
                 */
                //loader: 'style-loader!css-loader!postcss-loader'
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // 表示在 css loader 之前( 即 postcss-loader )处理 1 个数量级的 import 进来的 css 文件
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    // 处理最近的5个版本
                                    browsers: ['last 5 versions']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                /*
                 * 解析 less 文件，首先要安装 less 处理器，然后再安装 less-loader
                 *  npm install less --save-dev
                 *  npm install less-loader --save-dev
                 */
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 5 versions']
                                })
                            ]
                        }
                    },
                    /*
                     * 为了使 postcss 生效，只要将 postcss-loader 放在 style-loader 和 less-loader 中间即可
                     * 注：在使用 less-loader 的时候，可以不用指定 css-loader 的 importLoaders 参数，因为 less-loader 已经处理过了，
                     *     less-loader 可以直接处理 import 的文件
                     */
                    'less-loader'
                ]
            },
            {
                // 解析 html 模板  npm install html-loader --save-dev
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                // 解析 ejs 文件  npm install ejs-loader --save-dev  ejs-loader 会把文件处理成一个函数
                test: /\.ejs$/,
                use: 'ejs-loader'
            },
            {
                /*
                 *  解析处理图片文件的 loader ，jpe?g 表示可以存在 e 也可以不存在，正则中的 i 表示不区分大小写，  npm intsall file-loader --save-dev
                 *  只要添加了 loader 之后，无论是在 css 文件中引用图片还是在跟目录（ index.html 文件）中引用图片文件都会被替换成这个 loader 处理好的图片文件
                 *
                 *  但是在模板文件中（layer.html、layer.ejs）使用相对路径就会出问题！
                 *  解决办法:  1. 使用绝对路径
                 *            2. 图片的 src 通过 js require 的方式引入图片的相对路径  src="${ require('../../assets/face.png') }"
                 *
                 *  npm install url-loader --save-dev
                 *  另一个处理文件的 url-loader 它有一个 limit 参数，可以设置一个容量（20000字节，即20K），当小于这个容量的文件会被处理成 base64 编码 ( 这样的话图片文件
                 *  就不会被打包了，被处理成了 base64 编码存放于引用图片的文件中了)，而大于这个容量的文件，会被扔给 file-loader 来处理
                 */
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        // loader: 'file-loader',    // 优点：可以利用浏览器请求缓存  缺点：增加 http 请求
                        loader: 'url-loader',        // 优点：减少 http 请求        缺点： 没有缓存，代码冗余，文件体积变大
                        /*
                         * file-loader 中也有占位符，默认的 output 都是在 .dist 目录下，我们把文件指定输出到 .dist/assets/ 目录下
                         *  name: 文件名
                         *  hash: 打包 hash ， hash:5  只保留 hash 值的前5位
                         *  ext: 文件原本的后缀名
                         */
                        options: {
                            limit: 10000,
                            name: 'assets/[name]-[hash:5].[ext]'
                        }
                    },
                    /*
                     * image-webpack-loader 是用来压缩图片的，要放在 file & url loader 之前处理，具体参数看 npm 官网介绍
                     * 相对于不同的图片后缀文件有不同的优化参数，具体看 github 或 npm 官网介绍
                     * 之前 51KB 的图片被处理成了 28KB， url-loader 的 limit 参数也是针对压缩过后的文件大小来比较的，而不是跟原图大小进行比较
                     */
                    'image-webpack-loader'
                ]
            }
        ]
    },
    mode: 'development',
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        }),
    ]
};