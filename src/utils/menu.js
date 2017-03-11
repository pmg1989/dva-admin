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
    power: [1]
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
        power: [1, 4]
      }
    ]
  },
  //order
  {
    id: _.uniqueId(),
    key: 'order',
    name: '订单管理',
    icon: 'bars',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'list',
        name: '订单列表',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'flow',
        name: '账户流水',
        power: [1, 2]
      }
    ]
  },
  //live
  {
    id: _.uniqueId(),
    key: 'live',
    name: '直播管理',
    icon: 'play-circle-o',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'list',
        name: '直播列表',
        power: [1, 2]
      }
    ]
  },
  //bbs
  {
    id: _.uniqueId(),
    key: 'bbs',
    name: '论坛管理',
    icon: 'message',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'message',
        name: '帖子列表',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'reply',
        name: '回复列表',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'recommend',
        name: '小编推荐',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'category',
        name: '分类管理',
        power: [1, 2, 3, 4, 5]
      },
      {
        id: _.uniqueId(),
        key: 'label',
        name: '标签管理',
        power: [1, 2]
      },
      {
        id: _.uniqueId(),
        key: 'silence',
        name: '禁言管理',
        power: [1, 2]
      }
    ]
  },
  //score
  {
    id: _.uniqueId(),
    key: 'score',
    name: '积分管理',
    icon: 'pay-circle-o',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'change',
        name: '积分变更',
        power: [1, 2]
      }
    ]
  },
  //course
  {
    id: _.uniqueId(),
    key: 'course',
    name: '课程管理',
    icon: 'book',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'list',
        name: '课程列表',
        power: [1, 2]
      }
    ]
  },
]

export default menu
