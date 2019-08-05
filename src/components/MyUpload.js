import React from 'react'
import plupload from 'plupload';

export default class MyUpload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.uploader = new plupload.Uploader({})
    console.log(this.uploader)
  }
  render() {
    console.log(this)
    return (<div><button>test</button></div>)
  }
}