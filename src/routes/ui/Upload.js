import React, {Component} from 'react'
import UploadFile from '../../components/common/UploadFile'
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
    console.log(file);
  }

  handleUpload(files) {
    console.log(files);
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
              <Form horizontal onSubmit={::this.handleOk}>
                <FormItem label='文件上传' hasFeedback>
                  <UploadFile fileList={file} onUpload={::this.handleSigleUpload}></UploadFile>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large">确认提交</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="多文件无限制上传" key="2">
              <Form horizontal onSubmit={::this.handleOk}>
                <FormItem label='文件上传' hasFeedback>
                  <UploadFile fileList={files1} onUpload={::this.handleUpload} multiple></UploadFile>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large">确认提交</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="多文件限制数量上传" key="3">
              <Form horizontal onSubmit={::this.handleOk}>
                <FormItem label='文件上传' hasFeedback>
                  <UploadFile fileList={files2} onUpload={::this.handleUpload} multiple></UploadFile>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large">确认提交</Button>
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
