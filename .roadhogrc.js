const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  hash: true,
  publicPath : `/${version}/`,
  outputPath : `./dist/${version}`,
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  } ,
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd', 'style': true }],
        ["module-resolver", {
          root: ["./src"],
          alias: {
            components: `${__dirname}/src/components`,
            utils: `${__dirname}/src/utils`,
            config: `${__dirname}/src/utils/config`,
            services: `${__dirname}/src/services`,
            models: `${__dirname}/src/models`,
            routes: `${__dirname}/src/routes`,
            constants: `${__dirname}/src/constants`,
            themes: `${__dirname}/src/themes`,
          }
        }]
      ],
      define: {
        'newband.app.admin.ISMOCK': true,
        'newband.app.admin.API_HOST': 'http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81/v2',
        'newband.app.admin.CLIENT_ID': '8_458xy3o1w2g4cgwkk0ksgs0kkkw8o4soc000g004csoo840og4',
        'newband.app.admin.CLIENT_SECRET': '2iwh0zfunzswgss8s0ks4scoo4w080sskcowgkoc0s8swg8goo',
        'newband.app.admin.GRANT_TYPE': 'client_credentials'
      },
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        ['import', { 'libraryName': 'antd', 'style': true }],
        ["module-resolver", {
          root: ["./src"],
          alias: {
            components: `${__dirname}/src/components`,
            utils: `${__dirname}/src/utils`,
            config: `${__dirname}/src/utils/config`,
            services: `${__dirname}/src/services`,
            models: `${__dirname}/src/models`,
            routes: `${__dirname}/src/routes`,
            constants: `${__dirname}/src/constants`,
            themes: `${__dirname}/src/themes`,
          }
        }]
      ],
      define: {
        'newband.app.admin.ISMOCK': true,
        'newband.app.admin.API_HOST': 'http://ec2-54-223-130-122.cn-north-1.compute.amazonaws.com.cn:81/v2',
        'newband.app.admin.CLIENT_ID': '8_458xy3o1w2g4cgwkk0ksgs0kkkw8o4soc000g004csoo840og4',
        'newband.app.admin.CLIENT_SECRET': '2iwh0zfunzswgss8s0ks4scoo4w080sskcowgkoc0s8swg8goo',
        'newband.app.admin.GRANT_TYPE': 'client_credentials'
      },
    }
  },
  dllPlugin : {
    exclude: ["babel-runtime"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
