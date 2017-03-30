//power = { 1: "查看菜单", 2: "查看详情", 3: "新增", 4: "修改", 5: "删除", 6: "审核", 7: "上传" }
//options = { MENU: "查看菜单", DETAIL: "查看详情", ADD: "新增", UPDATE: "修改", DELETE: "删除", CHECK: "审核", UPLOAD: "上传" }
import _ from 'lodash'

const menu = [
  //dashboard
  {
    id: _.uniqueId(),
    key: 'dashboard',
    name: '管理平台',
    icon: 'laptop',
    power: [1, 2]
  },
  //account
  {
    id: _.uniqueId(),
    key: 'account',
    name: '用户管理',
    icon: 'user',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'admin',
        name: '管理员',
        power: [1, 2, 3, 4, 5]
      },
      {
        id: _.uniqueId(),
        key: 'role',
        name: '管理员角色',
        power: [1, 2, 3, 4, 5]
      },
      {
        id: _.uniqueId(),
        key: 'user',
        name: '用户',
        power: [1, 2, 3, 4, 5]
      }
    ]
  },
  //system
  {
    id: _.uniqueId(),
    key: 'system',
    name: '系统管理',
    icon: 'appstore',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'modify-password',
        name: '修改密码',
        power: [1, 2, 4]
      }
    ]
  },
  //bbs
  {
    id: _.uniqueId(),
    key: 'bbs',
    name: '前端分页',
    icon: 'message',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'category',
        name: '分类管理',
        power: [1, 2, 3, 4, 5]
      }
    ]
  },
  //多级导航
  {
    id: _.uniqueId(),
    key: 'navigation',
    name: '测试导航',
    icon: 'setting',
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'navigation1',
        name: '二级导航1',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'navigation2',
        name: '二级导航2',
        clickable: false,
        power: [1],
        children: [
          {
            id: _.uniqueId(),
            key: 'navigation21',
            name: '三级导航1',
            power: [1, 2],
          },
          {
            id: _.uniqueId(),
            key: 'navigation22',
            name: '三级导航2',
            power: [1, 2],
          }
        ]
      },
    ],
  },
  //UI组件
  {
    id: _.uniqueId(),
    key: 'ui',
    name: 'UI组件',
    icon: 'like-o',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'upload',
        name: '文件上传',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'media-player',
        name: '音频视频',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'drop-menu',
        name: '下拉操作菜单',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'lz-editor',
        name: 'LzEditor',
        power: [1, 2]
      }
    ]
  }
]

export default menu
