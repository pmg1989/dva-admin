import React, { Component, PropTypes } from 'react'
import { Upload, Button, Icon, Modal, message } from 'antd'
import styles from './UploadFile.less'
import Cookie from '../../utils/cookie'

class UploadFiles extends React.Component {

  static propTypes = {
    fileList: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
    onUpload: PropTypes.func.isRequired,
    multiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
  }

  constructor(props) {
    super(props)

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: Array.isArray(props.fileList) ? props.fileList.map((url, key) => {
        const urlArr = url.split('/')
        return { url: url, uid: key, name: urlArr[urlArr.length - 1], status: 'done' }
      }) : [{ uid: -1, url: props.fileList, name: props.fileList.split('/')[props.fileList.split('/').length - 1], status: 'done' }]
    }
  }

  render() {

    const { previewVisible, previewImage, fileList } = this.state

    const { multiple = 1, onUpload } = this.props

    const renderFiles = (files) => {
      const fileList = files.map(file => {
        return file.url || file.thumbUrl
      })

      if(multiple === 1) {
        return fileList[0]
      }
      return fileList
    }

    const uploadProps = {
      action: 'test.do',//newband.app.admin.API_HOST + '?access_token=' + Cookie.get('access_token'),
      data: {
      },
      listType: 'picture-card',
      fileList: fileList,
      multiple: multiple === true,
      onPreview: (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true
        })
      },
      beforeUpload: (file) => {
        return true
      },
      onChange: ({ file, fileList, e }) => {
        this.setState({ fileList: fileList })
        onUpload(renderFiles(fileList))
      },
      onRemove: (file) => {
        const fileList = this.state.fileList.filter(item => item.uid !== file.uid)
        onUpload(renderFiles(fileList))
      }
    }

    const modalProps = {
      visible: previewVisible,
      footer: null,
      onCancel: () => this.setState({ previewVisible: false })
    }

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    )

    return (
      <div className="clearfix">
        <Upload {...uploadProps}>
          {multiple === true ? uploadButton : (fileList.length >= multiple ? null : uploadButton)}
        </Upload>
        <Modal {...modalProps}>
          <img className={styles.previewImage} alt='' src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadFiles
