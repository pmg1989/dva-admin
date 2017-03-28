import React, {Component} from 'react'
import UploadFile from '../../../components/UploadFile'
import {Form, Button, Row, Col, Tabs} from 'antd'

const FormItem = Form.Item
const TabPane = Tabs.TabPane

class Upload extends Component {

  state = {
    file: '',
    files1: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
    files2: []
  }

  handleSigleUpload(file) {
    this.setState({file: file})
  }

  handleInfiniteUpload(files) {
    this.setState({files1: files})
  }

  handleLimiteUpload(files) {
    this.setState({files2: files})
  }

  handleOk(e) {
    e.preventDefault()
  }
  render() {
    const { file, files1, files2 } = this.state

    return (
      <Row>
        <Col span={16} offset={4}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="单文件上传" key="1">
              <Form onSubmit={::this.handleOk}>
                <FormItem label='文件上传' hasFeedback>
                  <UploadFile fileList={file} onUpload={::this.handleSigleUpload}></UploadFile>
                </FormItem>
                <FormItem label='文件名' >
                  {file}
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="多文件无限制上传" key="2">
              <Form layout="horizontal" onSubmit={::this.handleOk}>
                <FormItem label='文件上传' hasFeedback>
                  <UploadFile fileList={files1} onUpload={::this.handleInfiniteUpload} multiple></UploadFile>
                </FormItem>
                <FormItem label='文件列表' >
                  {JSON.stringify(files1)}
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="多文件限制数量上传" key="3">
              <Form layout="horizontal" onSubmit={::this.handleOk}>
                <FormItem label='文件上传' hasFeedback>
                  <UploadFile fileList={files2} onUpload={::this.handleLimiteUpload} multiple={3} ></UploadFile>
                </FormItem>
                <FormItem label='文件列表' >
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
