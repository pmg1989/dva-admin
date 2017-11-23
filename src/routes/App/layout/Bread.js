import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'dva/router'
import { menu } from 'utils'
import styles from './Bread.less'

let pathSet = []

const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || '/'
  menuArray.forEach((item) => {
    pathSet[(parentPath + item.key).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined,
    }
    if (item.children) {
      getPathSet(item.children, `${parentPath + item.key}/`)
    }
  })
}
getPathSet(menu)

function Bread ({ location }) {
  let pathNames = []
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push((`${pathNames[key - 1]}-${item}`).hyphenToHump())
    } else {
      pathNames.push((`-${item}`).hyphenToHump())
    }
  })
  const breads = pathNames.map((item, key) => {
    if (!(item in pathSet)) {
      item = 'Dashboard'
    }
    return (
      <Breadcrumb.Item key={key} {...((pathNames.length - 1 === key) || !pathSet[item].clickable) ? '' : { href: pathSet[item].path }}>
        {pathSet[item].icon
          ? <Icon type={pathSet[item].icon} />
          : ''}
        <span>{pathSet[item].name}</span>
      </Breadcrumb.Item>
    )
  })

  const title = pathNames.map((item) => {
    if (!(item in pathSet)) {
      item = 'Dashboard'
    }
    return pathSet[item].name
  })

  return (
    <div className={styles.bread}>
      <Helmet><title>{title.join(' - ')}</title></Helmet>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/"><Icon type="home" /><span>主页</span></Link>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object,
}

export default Bread
