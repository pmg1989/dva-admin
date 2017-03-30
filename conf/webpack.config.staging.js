const webpack = require('atool-build/lib/webpack')
const path = require('path')

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime')
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true
  }])

  webpackConfig.devtool = 'eval' //#inline-source-map

  // Support hmr
  if (env === 'development') {
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js'
      ]
    }])
  } else {
    webpackConfig.babel.plugins.push('dev-expression')
    webpackConfig.entry = {
      index: './src/index.js',
      // common: [ 'react', 'react-dom', 'classnames', 'dva', 'dva-loading', 'qs', 'js-cookie', 'moment', 'rc-queue-anim', 'rc-tween-one']
    }
  }
  //mock data config
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'newband.app.admin.ISMOCK': true,
    'newband.app.admin.IS_DYNAMIC_LOAD': true,
    'newband.app.admin.API_HOST': JSON.stringify('http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81/v2'),
    'newband.app.admin.CLIENT_ID': JSON.stringify('8_458xy3o1w2g4cgwkk0ksgs0kkkw8o4soc000g004csoo840og4'),
    'newband.app.admin.CLIENT_SECRET': JSON.stringify('2iwh0zfunzswgss8s0ks4scoo4w080sskcowgkoc0s8swg8goo'),
    'newband.app.admin.GRANT_TYPE': JSON.stringify('client_credentials')
  }))

  // Don't extract common.js and common.css (please extract if use common.js)
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
