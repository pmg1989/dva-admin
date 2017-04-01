import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Tabs } from 'antd'
import styles from './TabMenu.less'

const TabPane = Tabs.TabPane

class TabMenu extends React.Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0
    const tabMenus = JSON.parse(localStorage.getItem('tabMenus')) || {
      key: '1',
      title: '管理平台'
    }
    this.state = {
      activeKey: tabMenus.key,
      panes: [{...tabMenus, content: props.children}]
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newTab.key !== this.props.newTab.key) {
      const newTab = {...nextProps.newTab}
      const { panes } = this.state

      if(panes.find(cur => cur.key === newTab.key)) {
        this.setState({ activeKey: newTab.key })
      } else {
        panes.push({...newTab, content: nextProps.children})
        this.setState({ panes, activeKey: newTab.key })
      }
    }
    return true
  }

  onChange(activeKey) {
    this.setState({ activeKey })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  remove(targetKey) {
    let { activeKey, panes } = this.state
    let lastIndex
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    panes = panes.filter(pane => pane.key !== targetKey)
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key
    }
    this.setState({ panes, activeKey })
  }

  render() {
    const { newTab, children } = this.props
    const { panes, activeKey } = this.state

    return (
      <Tabs
        hideAdd
        animated={false}
        onChange={::this.onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={::this.onEdit}
      >
      {panes.map((pane, index) => (
        <TabPane tab={<Link to={pane.path}>{pane.title}</Link>} key={pane.key} closable={pane.closable}>
          {React.cloneElement(pane.content, { curPowers: newTab.curPowers, key: location.pathname })}
        </TabPane>
      ))}
      </Tabs>
    );
  }
}

export default TabMenu
