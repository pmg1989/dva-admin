module.exports = [
  {
    key: 'dashboard',
    name: '管理平台',
    icon: 'laptop'
  },
  {
    key: 'account',
    name: '用户管理',
    icon: 'user',
    clickable: false,
    child: [
      {
        key: 'admin',
        name: '管理员'
      },
      {
        key: 'role',
        name: '管理员角色'
      },
      {
        key: 'user',
        name: '用户'
      }
    ]
  },
  {
    key: 'system',
    name: '系统管理',
    icon: 'appstore',
    clickable: false,
    child: [
      {
        key: 'modify-password',
        name: '修改密码'
      }
    ]
  },
]
