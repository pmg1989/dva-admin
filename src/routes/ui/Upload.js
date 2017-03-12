import React, {Component} from 'react'
import UploadFile from '../../components/common/UploadFile'
import {Form, Button} from 'antd'
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class Upload extends Component {
  handleUpload(files) {
  }
  handleOk(e) {
    e.preventDefault()
  }
  render() {
    // const files = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    const files = ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
    return (
      <Form horizontal onSubmit={::this.handleOk}>
        <FormItem label='用户名：' hasFeedback {...formItemLayout}>
          <UploadFile fileList={files} onUpload={::this.handleUpload} multiple></UploadFile>
        </FormItem>
        <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit" size="large">确认提交</Button>
        </FormItem>
      </Form>
    )
  }
}
export default Form.create()(Upload)
