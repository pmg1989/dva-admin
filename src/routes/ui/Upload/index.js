import React, { Component } from 'react'
import { Form, Row, Col, Tabs } from 'antd'
import { UploadFile } from 'components'

const FormItem = Form.Item
const TabPane = Tabs.TabPane

class Upload extends Component {
  state = {
    file: '',
    files1: [{ id: 1, full_url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' }],
    files2: [],
  }

  handleSigleUpload (file) {
    this.setState({ file })
  }

  handleInfiniteUpload (files) {
    this.setState({ files1: files })
  }

  handleLimiteUpload (files) {
    this.setState({ files2: files })
  }

  render () {
    const { file, files1, files2 } = this.state

    return (
      <Row>
        <Col span={16} offset={4}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="单文件上传" key="1">
              <Form>
                <FormItem label="文件上传" hasFeedback>
                  <UploadFile files={file} onUpload={::this.handleSigleUpload} />
                </FormItem>
                <FormItem label="文件名" >
                  {file}
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="多文件无限制上传" key="2">
              <Form layout="horizontal">
                <FormItem label="文件上传" hasFeedback>
                  <UploadFile files={files1} onUpload={::this.handleInfiniteUpload} multiple />
                </FormItem>
                <FormItem label="文件列表" >
                  {JSON.stringify(files1)}
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="多文件限制数量上传" key="3">
              <Form layout="horizontal">
                <FormItem label="文件上传" hasFeedback>
                  <UploadFile files={files2} onUpload={::this.handleLimiteUpload} multiple={3} />
                </FormItem>
                <FormItem label="文件列表" >
                  {JSON.stringify(files2)}
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    )
  }
}
export default Form.create()(Upload)
