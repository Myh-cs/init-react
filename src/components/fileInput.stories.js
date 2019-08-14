import React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from './Upload/file-input';
import PauseButton from './Upload/pause-resume-button';
import './test.less'

import FineUploaderTraditional from 'fine-uploader-wrappers'

class SimpleUpload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { visibleFiles: [], inputkey: 'init', progress: 0 }
    this.fileInput = React.createRef();
    this.uploader = new FineUploaderTraditional({
      options: {
        // autoUpload: false,
        debug: true,
        chunking: {
          enabled: true,
          success: { endpoint: 'http://10.205.20.23:8081/test/chunksdone' }
        },
        resume: { // 离开页面续传
          enabled: true
        },
        request: {
          endpoint: 'http://10.205.20.23:8081/test/uploads'
          // endpoint: '/upload/useFileUtilsCopyInputStreamToFile2'
        }
      }
    });
    this.statusEnum = this.uploader.qq.status

  }
  componentDidMount() {
    this.uploader.on('statusChange', this.onStatusChange)
  }
  componentWillUnmount() {
    this.uploader.off('statusChange', this.onStatusChange)

  }
  onFileChange = (event) => {
    this.uploader.methods.addFiles(event.target)
  }
  onStatusChange = (id, oldStatus, status) => {
    console.log(id, oldStatus, status);
    const currentVisibleFiles = this.uploader.methods.getUploads()
      .filter(item => item.status !== this.statusEnum.CANCELED);
    this.setState({ visibleFiles: currentVisibleFiles });
  }
  pauseById = (id) => {
    console.log(id);
    this.uploader.methods.pauseUpload(id);
  }
  continueById = (id) => {
    this.uploader.methods.continueUpload(id);
  }
  cancelByid = (id) => {
    // this.setState({ visibleFiles: [], progress: 0 });
    // console.log(Object.keys(this.fileInput.current))
    // this.setState({ inputkey: `${id}${new Date().getTime()}` })
    this.uploader.methods.cancel(id);
  }
  findFileIndexById = (id) => {
    const { visibleFiles } = this.state;
    for (let index = 0; index < visibleFiles.length; index++) {
      const element = visibleFiles[index];
      if (element.id === id) {
        return index;
      }
    }
    return -1
  }
  render() {
    const { visibleFiles } = this.state;
    return (
      <>
        <input key={this.state.inputkey} multiple style={{ visibility: 'hidden', height: 0, width: 0 }} type="file" ref={this.fileInput} onChange={this.onFileChange} />
        {visibleFiles.map(file => {
          const renderProgress = ({ id, status, name }) => {
            if (status === this.statusEnum.UPLOADING || status === this.statusEnum.UPLOAD_FINALIZING) {
              return <span>文件：{name} 正在上传：<UploadProgress id={id} uploader={this.uploader} /></span>
            }
          }
          return (
            <div>
              {renderProgress(file)}
              {file.status === this.statusEnum.PAUSED ?
                <button onClick={() => this.continueById(file.id)}>继续</button>
                :
                <button onClick={() => this.pauseById(file.id)}>暂停</button>
              }
              <button onClick={() => this.cancelByid(file.id)}>取消</button>

            </div>
          )
        })}
        <button onClick={() => { this.fileInput.current.click() }}>上传文件</button>

      </>
    )
  }
}

class UploadProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0
    }
  }
  defaultProps = {
    total: false,
    uploader: null,
    id: ''
  }
  componentDidMount() {
    if (this.props.uploader) {
      if (this.props.total) {
        this.props.uploader.on('onTotalProgress', this.onTotalProgressChange);
      } else {
        this.props.uploader.on('onProgress', this.onProgressChange);
      }
    }
  }
  componentWillUnmount() {
    if (this.props.uploader) {
      if (this.props.total) {
        this.props.uploader.off('onTotalProgress', this.onTotalProgressChange);
      } else {
        this.props.uploader.off('onProgress', this.onProgressChange);
      }
    }
  }
  onProgressChange = (id, name, uploadedBytes, totalBytes) => {
    if (id === this.props.id) {
      this.setState({ percent: (uploadedBytes * 100 / totalBytes).toFixed(2) })
    }
  }
  onTotalProgressChange = (totalUploadedBytes, totalBytes) => {
    this.setState({ percent: (totalUploadedBytes * 100 / totalBytes).toFixed(2) });
  }

  render() {
    return (
      <span>
        {this.state.percent}%
      </span>
    );

  }
}


storiesOf('components/SimpleUpload', module).add('SimpleUpload', () => {
  return (
    <>
      <SimpleUpload key='upload1' />
      <SimpleUpload key='upload2' />

    </>
  )
});