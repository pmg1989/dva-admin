const webpack = require('atool-build/lib/webpack')
const path = require('path')

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime')
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true
  }])

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = 'eval' //#inline-source-map
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js'
      ]
    }])
  } else {
    webpackConfig.babel.plugins.push('dev-expression')
    webpackConfig.entry = {
      index: './src/index.js',
      common: [ 'react', 'react-dom', 'classnames', 'antd', 'dva', 'qs', 'js-cookie', 'moment', 'rc-queue-anim', 'rc-tween-one']
    }
  }
  //mock data config
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'newband.app.admin.ISMOCK': false,
    'newband.app.admin.IS_DYNAMIC_LOAD': true,
    'newband.app.admin.API_HOST': JSON.stringify('https://api.students.newband.com/v2'),
    'newband.app.admin.CLIENT_ID': JSON.stringify('8_1gpoabwdk19ccow0o0wog4kogwsswkksoo4wg8o8so08w40cs8'),
    'newband.app.admin.CLIENT_SECRET': JSON.stringify('672j6lg4eakgks0wo8ggkg0ssko8gkk8808g0cs8oco4gcoo40'),
    'newband.app.admin.GRANT_TYPE': JSON.stringify('client_credentials')
  }))

  // Don't extract common.js and common.css
  // webpackConfig.plugins = webpackConfig.plugins.filter(function (plugin) {
  //   return !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  // })

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
