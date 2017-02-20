const webpack = require('atool-build/lib/webpack')

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime')
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true
  }])

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval'
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js'
      ]
    }])
  } else {
    webpackConfig.babel.plugins.push('dev-expression')
  }
  //mock data config
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'newband.app.admin.ISMOCK': true,
    'newband.app.admin.API_HOST': '"http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81/v2"',
    'newband.app.admin.CLIENT_ID': '"7_3couvjpeukmc4wc88ww00s8c0cc4wcswc8404oow8ogwksgcck"',
    'newband.app.admin.CLIENT_SECRET': '"4kztndqf54sgowkcs8kw404c0kc04c0gsgwog8gogwwc8kk8kc"',
    'newband.app.admin.GRANT_TYPE': '"client_credentials"'
  }))

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  })

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.less$/
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/
      loader.test = /\.less$/
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.css$/
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/
      loader.test = /\.css$/
    }
  })

  return webpackConfig
}
