import React from 'react';
import { storiesOf } from '@storybook/react';
function radomID() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function formatID() {
  return (`${radomID()}${radomID()}-${radomID()}-${radomID()}-${radomID()}-${radomID()}${radomID()}${radomID()}`);
}
function paseStartIndex(file) {
  return JSON.parse(localStorage.getItem(file[id])).index;
}
function paseChunckIndex(file) {
  return JSON.parse(localStorage.getItem(file[id])).chunckIndex;
}
// 只有在上传的时候再开始切片 
class Upload extends React.PureComponent {
  state = { files: [], filesUpload: [] }
  uploader = React.createRef();
  onFileChange = (e, r, s) => {
    console.log(e, r, s);
    console.log(e.nativeEvent);
    const files = e.nativeEvent.target.files
    this.setState({ files })
    this.setState({ filesUpload: Array.from(files).splice(0, 2) });
  }
  formatFiles(fileList) {
    for (let i = 0; i < fileList; i++) {
      const file = fileList[i];
      file.id = formatID();
    }
  }
  UploadFiles(fileList, chunckSize) {
    for (let i = 0; i < fileList; i++) {
      const file = fileList[i];
      if (file.size > chunckSize) {
        chunckUploadFile(file, chunckSize)
      } else {
        normalUpload(file);
      }
    }
  }
  chunckUploadFile(file, chunckSize) { // TODO
    const startIndex = paseStartIndex(file) || 0;
    const endIndex = startIndex + chunckSize;
    const total = Math.ceil(file.size / chunckSize);
    const chunckIndex = paseChunckIndex(file) || 0;
    const chunckBlob = file.splice(startIndex, chunckSize);
  }
  normalUpload = (file) => { // TODO

  };
  clearList = () => { console.log(this.uploader.current.files); this.setState({ files: null }) }
  render() {
    console.log(this.state.files);
    console.log(this.state.filesUpload);

    return (
      <div>
        <input type="file" multiple ref={this.uploader} onChange={this.onFileChange} />
        <input type="button" onClick={this.clearList} value="清除" />
      </div>
    )
  }
}

storiesOf('components/UploadRewirte', module).add('default view', () => {

  return (
    <div>
      <Upload />
    </div>
  )
});