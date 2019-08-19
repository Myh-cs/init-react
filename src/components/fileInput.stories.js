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
    this.uploader.on('onProgress', this.onProgressChange)
  }
  componentWillUnmount() {
    this.uploader.off('statusChange', this.onStatusChange)
    this.uploader.off('onProgress', this.onProgressChange)

  }
  onFileChange = (event) => {
    this.uploader.methods.addFiles(event.target)
  }
  onProgressChange = (id, name, uploadedBytes, totalBytes) => {
    console.log(`id:${id},name:${name},upload:${uploadedBytes},total:${totalBytes}`);
    this.setState({ progress: (uploadedBytes * 100) / totalBytes });
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
    this.setState({ visibleFiles: [], progress: 0 });
    console.log(Object.keys(this.fileInput.current))
    this.setState({ inputkey: `${id}${new Date().getTime()}` })
    this.uploader.methods.cancel(id);
  }
  pauseButtonRender = (id) => {
    if (this.state.visibleFiles.length) {
      if (this.state.visibleFiles[0].status === this.statusEnum.PAUSED) {
        return <button onClick={() => this.continueById(id)}>继续</button>
      } else {
        return <button onClick={() => this.pauseById(id)}>暂停</button>
      }
    }
  }
  cancelButtonRender = (id) => {
    if (this.state.visibleFiles.length) {
      return <button onClick={() => this.cancelByid(id)}>取消</button>
    }
  }

  render() {
    const id = this.state.visibleFiles.length ? this.state.visibleFiles[0].id : null;
    return (
      <>
        <input key={this.state.inputkey} style={{ visibility: 'hidden', height: 0, width: 0 }} type="file" ref={this.fileInput} onChange={this.onFileChange} />
        <button onClick={() => { this.fileInput.current.click() }}>上传文件</button>
        <div>
          {this.state.progress > 0 && `文件名:${this.state.visibleFiles[0].name}, 已经上传${this.state.progress.toFixed(2)}% `}
          {this.pauseButtonRender(id)}
          {this.cancelButtonRender(id)}
        </div>
      </>
    )
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