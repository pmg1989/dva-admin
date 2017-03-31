import {color} from '../src/utils/theme'
const Mock = require('mockjs')
import mockStorge from '../src/utils/mockStorge'

let dataKey = mockStorge('Dashboard', Mock.mock({
  'sales|8': [
    {
      'name|+1': 2008,
      'Clothes|200-500': 1,
      'Food|180-400': 1,
      'Electronics|300-550': 1
    }
  ],
  'cpu': {
    'usage|50-600': 1,
    space: 825,
    'cpu|40-90': 1,
    'data|20': [
      {
        'cpu|20-80': 1
      }
    ]
  },
  'browser': [
    {
      name: 'Google Chrome',
      percent: 43.3,
      status: 1
    },
    {
      name: 'Mozilla Firefox',
      percent: 33.4,
      status: 2
    },
    {
      name: 'Apple Safari',
      percent: 34.6,
      status: 3
    },
    {
      name: 'Internet Explorer',
      percent: 12.3,
      status: 4
    },
    {
      name: 'Opera Mini',
      percent: 3.3,
      status: 1
    },
    {
      name: 'Chromium',
      percent: 2.53,
      status: 1
    }
  ],
  user: {
    name: 'pmg1989',
    email: '972401854@qq.com',
    sales: 3241,
    sold: 3556,
    avatar: 'https://avatars0.githubusercontent.com/u/13361827?v=3&s=460'
  },
  'completed|12': [
    {
      'name|+1': 2008,
      'Task complete|200-1000': 1,
      'Cards Complete|200-1000': 1
    }
  ],
  'comments|5': [
    {
      name: '@last',
      'status|1-3': 1,
      content: '@sentence',
      avatar: function () {
        return Mock.Random.image('48x48', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1))
      },
      date: function () {
        return '2016-' + Mock.Random.date('MM-dd') + ' ' + Mock.Random.time('HH:mm:ss')
      }
    }
  ],
  'recentSales|36': [
    {
      'id|+1': 1,
      name: '@last',
      'status|1-4': 1,
      date: function () {
        return Mock.Random.integer(2015, 2016) + '-' + Mock.Random.date('MM-dd') + ' ' + Mock.Random.time('HH:mm:ss')
      },
      'price|10-200.1-2': 1
    }
  ],
  quote: {
    name: 'Joho Doe',
    title: 'Graphic Designer',
    content: `I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.`,
    avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236'
  },
  numbers: [
    {
      icon: 'pay-circle-o',
      color: color.green,
      title: 'Online Review',
      number: 2500,
      percent: 25
    }, {
      icon: 'team',
      color: color.blue,
      title: 'New Customers',
      number: 5000,
      percent: 50
    }, {
      icon: 'message',
      color: color.purple,
      title: 'Active Projects',
      number: 7500,
      percent: 75
    }, {
      icon: 'shopping-cart',
      color: color.red,
      title: 'Referrals',
      number: 10000,
      percent: 100
    }
  ]
}))

module.exports = {
  'GET /api/dashboard' (req, res) {
    res.json(global[dataKey])
  }
}
