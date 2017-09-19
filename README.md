# dva-admin

[![React Native](https://img.shields.io/badge/react-^15.4.1-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![Ant Design](https://img.shields.io/badge/ant--design-^2.8.2-yellowgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![dva](https://img.shields.io/badge/dva-^1.1.0-orange.svg?style=flat-square)](https://github.com/dvajs/dva)

[![GitHub issues](https://img.shields.io/github/issues/pmg1989/dva-admin.svg?style=flat-square)](https://github.com/pmg1989/dva-admin/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/pmg1989/dva-admin/pulls)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## 目的

- 期望打造一套基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)于一体的、企业级后台管理系统
- 期望可以单纯由前端来解决用户权限，后端提供权限数据支持的一套完善的权限管理功能后台管理系统
- 期望可以在antd与dva的基础上，再次封装简单且可复用的基类组件，方便使用者简单接入，简单使用，简单拓展

## 演示地址

https://pmg1989.github.io

#### 登录账号

-  管理员账号：admin，密码：admin
-  游客账号：guest, 密码：guest
- 由于gitpage是静态服务器，刷新后会出现404是正常现象，部署正式服务器即可，具体服务端配置可参见[dva issues 180](https://github.com/dvajs/dva/issues/180)

## 特性

- 基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock) 企业级后台管理系统最佳实践
- 基于[Mock](https://github.com/nuysoft/Mock)实现脱离后端独立开发
- 基于Antd UI 设计语言，提供后台管理系统常见使用场景
- 浅度响应式设计
- webpack打包处理路由时，实现Javascript模块化按需动态dynamic加载
- 已实现基本完善的权限管理功能
- 完善的后端分页与前端分页功能
- 封装好可扩展的上传控件与音视频控件
- 用[roadhog](https://github.com/sorrycc/roadhog)本地调试和构建，其中Mock功能实现脱离后端独立开发。

## 开发及构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /public/       # 公共文件，编译时copy至dist目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── skin.less    # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /routes/       # 路由组件
│ │ └── App/index.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ ├── /mock/         # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 菜单及面包屑配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── theme.js     # 项目需要在js中使用到样式变量
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .roadhogrc.js    # roadhog配置
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
npm run build:dll #第一次npm run dev时需运行此命令，使开发时编译更快
npm run dev

打开 http://localhost:8000
```


构建：

```bash
npm run build

将会打包至dist/{version}目录 #package.json里version字段

npm run build:new

将会打包至dist/{version增加1}目录 #package.json里version字段
```

代码检测：

```bash
git项目提交时，会自动run precommit 进而执行 npm run lint，执行esLint代码检测
```

### 注意事项

- 如需重写antd样式配置，请修改`src/theme.js`
- 项目配置文件在`src/utils/config.js`
- 如需重写异步请求函数，请修改`src/utils/request.js`
  （关于为什么使用axios而不是fetch：在一个无服务器的环境中模拟数据请求，[Mock](https://github.com/nuysoft/Mock)不能拦截Fetch，只能拦截XHR，所以我选了一个纯Ajax的库[axios](https://github.com/mzabriskie/axios)）

### 特别感谢

zuiidea: [https://github.com/zuiidea/antd-admin](https://github.com/zuiidea/antd-admin)

sorrycc: [https://github.com/dvajs/dva-example-user-dashboard](https://github.com/dvajs/dva-example-user-dashboard)
