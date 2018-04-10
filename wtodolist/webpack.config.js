const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target:'web',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test:/\.jsx$/,
        loader:'babel-loader'
      },
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.styl/,
        use:[
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              sourceMap:true,
            }
          },
          'stylus-loader'
        ]
      },
      {
        test:/\.(gif|jpg|jpeg|png|svg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:1024,
              name:'[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if(isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port:8000,
    host:'0.0.0.0',
    overlay:{
      errors:true
    },
    hot:true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
