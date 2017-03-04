# dva-admin

[![React Native](https://img.shields.io/badge/react-^15.4.1-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![Ant Design](https://img.shields.io/badge/ant--design-^2.7.0-yellowgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![dva](https://img.shields.io/badge/dva-^1.1.0-orange.svg?style=flat-square)](https://github.com/dvajs/dva)

[![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin.svg?style=flat-square)](https://github.com/pmg1989/dva-admin/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/pmg1989/dva-admin/pulls)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## 演示地址

https://pmg1989.github.io

- 登录账号 用户名：admin，密码：admin
- 由于gitpage是静态服务器，刷新后会出现404是正常现象，部署正式服务器即可，具体服务端配置可参见[dva issues 180](https://github.com/dvajs/dva/issues/180)

## 特性

- 基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践
- 基于[Mock](https://github.com/nuysoft/Mock)实现脱离后端独立开发
- 基于Antd UI 设计语言，提供后台管理系统常见使用场景
- 浅度响应式设计
- webpack打包处理路由时，实现Javascript模块化按需动态dynamic加载
- 已实现基本完善的权限管理功能

## 开发及构建

### 目录结构

```bash
├── /mock/           # 数据mock的接口文件
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /components/   # 项目组件
│ ├── /routes/       # 路由组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置

```

### 快速开始

克隆项目文件:

```
git clone git@github.com:pmg1989/dva-admin.git
```

进入目录安装依赖:

```
npm install 或者 yarn 或者 yarn install
```

开发：

```bash
npm run dev    # 使用mock拦截请求，数据存储在localStroge里

打开 http://localhost:8000
```


构建：

```bash
npm run build

将会生成dist目录
```

### 注意事项

- 生产环境中，已有数据接口，请将`webpack.config.js`中的 `webpackConfig.plugins.push(new webpack.DefinePlugin({ 'newband.admin.isMock': true }))`改为false
- 开发环境中，如再mock目录新增文件，请在`src/utils/mock.js`第二行的`mockData`数组中添加
- 如需重写antd样式配置，请修改`src/theme.js`
- 项目配置文件在`src/utils/config.js`
- 如需重写异步请求函数，请修改`src/utils/request.js`
  （关于为什么使用axios而不是fetch：在一个无服务器的环境中模拟数据请求，[Mock](https://github.com/nuysoft/Mock)不能拦截Fetch，只能拦截XHR，所以我选了一个纯Ajax的库[axios](https://github.com/mzabriskie/axios)）

## 参考

antd-admin：https://github.com/zuiidea/antd-admin

用户列表：https://github.com/dvajs/dva-example-user-dashboard

dashboard设计稿：https://dribbble.com/shots/3108122-Dashboard-Admin
