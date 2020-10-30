//入口使用绝对路径
const path = require('path')
    // const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引用安装的依赖
    // const HTMLPlugin = require('html-webpack-plugin');
    // const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
    // const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {

    target: 'web',
    entry: path.join(__dirname, 'src/index.js'), //入口
    output: { //输出，打包成bundle.js进行输出
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: { //这个节点用于配置所有的第三方模块加载器
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //配置处理.css文件的第三方处理规则
            { test: /\.less$/, use: ["style-loader", 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ["style-loader", 'css-loader', 'sass-loader'] },
            {
                test: /\.(jpg|png|gif|bmp|jpeg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-pq.[ext]'
                    }
                }]
            },
            // { test: /\.(jpg|png|gif|bmp|jpeg|svg)$/, use: "url-loader?limit=1024" },
            { test: /\.(tff|eot|svg|woff|woff2)$/, use: "url-loader" },
            { test: /\.jsx$/, use: 'babel-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //忽略掉node-modules里的js文件
            { test: /\.vue$/, use: 'vue-loader' },
            // { test: /\.vue$/, loader: 'vue-loader' },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    }
}

module.exports = config