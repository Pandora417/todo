// 服务端渲染

//入口使用绝对路径
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引用安装的依赖
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [{
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
            }]
        }

    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = { //devServer webpack2.0之后才有的
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            //如果有错误，就显示在网页中
            errors: true,
        },
        // open: true,
        // historyFallback:{},
        hot: true, //热加载，部分组件修改内容后，其他组件数据不刷新
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

}
module.exports = config