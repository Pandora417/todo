  //入口使用绝对路径
  const path = require('path')
  const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引用安装的依赖
  const HTMLPlugin = require('html-webpack-plugin');
  const webpack = require('webpack')
  const isDev = process.env.NODE_ENV === 'development'
  const ExtractPlugin = require('extract-text-webpack-plugin')

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
              { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
              { test: /\.vue$/, use: 'vue-loader' }
              // { test: /\.vue$/, loader: 'vue-loader' },
              //   {
              //       test: /\.styl/,
              //       use: [
              //           'style-loader',
              //           'css-loader',
              //           {
              //               loader: 'postcss-loader',
              //               options: {
              //                   sourceMap: true,
              //               }
              //           },
              //           'stylus-loader'
              //       ]
              //   }
          ]
      },
      plugins: [
          new VueLoaderPlugin(),
          new HTMLPlugin(),
          new webpack.DefinePlugin({
              'process.env': {
                  NODE_ENV: isDev ? '"development"' : '"production"'
              }
          })
      ]
  }
  if (isDev) {
      config.module.rules.push({
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
      });
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

  } else {
      config.output.filename = '[name].[chunkhash:8].js';
      config.plugins.push(
          new ExtractPlugin('styles.[contentHash:8].css')
      );
      config.module.rules.push({
          test: /\.styl/,
          use: ExtractPlugin.extract({
              fallback: 'style-loader',
              use: [
                  'css-loader',
                  'stylus-loader',
                  {
                      loader: 'postcss-loader',
                      options: {
                          sourceMap: true,
                      }
                  }
              ]
          })
      })
  }
  module.exports = config