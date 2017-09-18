import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal } from 'antd'
import { Cookie } from 'utils'
import styles from './UploadFile.less'

const getFileList = (files) => {
  if (Array.isArray(files)) {
    return files.map((item, key) => {
      const urlArr = item.full_url.split('/')
      return { url: item.full_url, id: item.id, uid: key, name: urlArr[urlArr.length - 1], status: 'done' }
    })
  }
  if (files && !!files.length) {
    const filesArr = files.split('/')
    return [{ uid: -1, url: files, name: filesArr[filesArr.length - 1], status: 'done' }]
  }
  return ''
}

function renderAccecpt (accept) {
  if (!accept) {
    return null
  }
  if (['image', 'video', 'audio'].find(ext => ext === accept)) {
    return `${accept}/*`
  }
  if (accept === 'zip') {
    return 'application/zip,application/x-zip,application/x-zip-compressed'
  }
  return `.${accept}`
}

class UploadFiles extends Component {
  static propTypes = {
    files: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onUpload: PropTypes.func.isRequired,
    multiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    disabled: PropTypes.bool,
    path: PropTypes.string,
    accept: PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.state = {
      previewVisible: false,
      previewImage: '',
      files: getFileList(props.files),
    }
  }

  componentWillReceiveProps (nextProps) {
    if (Array.isArray(this.props.files) && !this.props.files.length && !!nextProps.files.length) {
      this.setState({ files: getFileList(nextProps.files) })
    }
  }

  render () {
    const { previewVisible, previewImage, files } = this.state

    const { multiple = 1, onUpload, disabled, path, accept } = this.props

    const renderFiles = (fileList) => {
      const newFiles = fileList.map((file) => {
        return file.response ? file.response.data.file : file
      })
      if (multiple === 1) {
        return newFiles[0]
      }
      return newFiles
    }

    let actionUrl = `${newband.app.admin.API_HOST}v2/file/upload/formData?access_token=${Cookie.get('access_token')}`
    if (path) {
      actionUrl += `&path=${path}`
    }

    const uploadProps = {
      accept: renderAccecpt(accept),
      action: actionUrl,
      headers: {
        'X-Requested-With': null,
      },
      data: {
      },
      disabled,
      listType: 'picture-card',
      fileList: files,
      multiple: multiple === true,
      onPreview: (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        })
      },
      beforeUpload: () => {
        return true
      },
      onChange: ({ file, fileList }) => {
        this.setState({ files: fileList })
        if (file.percent === 100 && file.status === 'done') {
          onUpload(renderFiles(fileList, 1))
        }
      },
      onRemove: (file) => {
        if (disabled) {
          return false
        }
        const fileList = this.state.files.filter(item => item.uid !== file.uid)
        onUpload(renderFiles(fileList, 0))
        return true
      },
    }

    const modalProps = {
      visible: previewVisible,
      footer: null,
      onCancel: () => this.setState({ previewVisible: false }),
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
          {multiple === true ? uploadButton : (files.length < multiple && uploadButton)}
        </Upload>
        <Modal {...modalProps}>
          <img className={styles.previewImage} alt="" src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default UploadFiles
