const menus = [
  {
    id: 1,
    key: 'dashboard',
    name: '管理平台',
    icon: 'laptop',
    power: [0]
  },
  {
    id: 2,
    key: 'account',
    name: '用户管理',
    icon: 'user',
    clickable: false,
    power: [0],
    children: [
      {
        id: 3,
        key: 'admin',
        name: '管理员',
        power: [0, 1, 2, 3, 4]
      },
      {
        id: 4,
        key: 'role',
        name: '管理员角色',
        power: [0, 1, 2, 3, 4]
      },
      {
        id: 5,
        key: 'user',
        name: '用户',
        power: [0, 1, 2, 3, 4]
      }
    ]
  },
  {
    id: 6,
    key: 'system',
    name: '系统管理',
    icon: 'appstore',
    clickable: false,
    power: [0],
    children: [
      {
        id: 7,
        key: 'modify-password',
        name: '修改密码',
        power: [0, 2]
      }
    ]
  },
]

const getMenus = (menuArray, power) => {
  // const index = power[item.id].findIndex(cur => cur === 0)
  return menuArray.map((item, i) => {

  })
}

export function menusFromPower() {
  const power = {
    1: [0],
    2: [0],
    5: [0, 1, 2, 3, 4],
    6: [0],
    7: [0, 1, 2]
  }
  getMenus(menus, power, null)
}

menusFromPower()

export default menus
