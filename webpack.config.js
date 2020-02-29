var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: NODE_ENV == 'development' ? './src/main.js' : './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'npm-share.js',
    library: 'npm-share',//reruire的模块
    libraryTarget: 'umd', //指定输出的格式
    umdNamedDefine: true //会对UMD构建过程的AMD命名，否则匿名define
  },
  module: {
    rules: [
      {
        // test: /\.css$/,
        test:/\.scss/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },    
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,//打包信息隐藏
    overlay: true,
    port: 8080,
    open: true,
    host:'10.0.13.65'
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
