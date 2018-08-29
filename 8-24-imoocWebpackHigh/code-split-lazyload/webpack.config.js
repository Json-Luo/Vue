
var path = require('path');

module.exports = {
    entry: {
        pageA: './src/pageA.js',
        // pageB: './src/pageB.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        // 指定 chunk 名称
        chunkFilename: '[name].chunk.js',
        // 假如不指定 publicPath 的话，我们打包在 dist 目录下面的 chunks 就无法被浏览器正确识别到，这边是全部替换到 chunk name 前面去的，所以要写全路径符号
        publicPath: 'dist/',
    },
    mode: 'development',
    optimization: {
        splitChunks: {
            cacheGroups: {
                moduleA: {
                    name: 'moduleA',
                    minSize: 25,
                    minChunks: 2,
                    priority: 0,
                    reuseExistingChunk: true
                }
            }
        }
    }
};