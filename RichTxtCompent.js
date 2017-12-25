import React, { Component } from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import FL from '../../../utils/FL';


class RichTxtCompent extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    content: this.props.content,
    placeholder:this.props.placeholder,
    imgurl:this.props.imgurl
  }
  componentWillMount() {

  }
  // handleHTMLChange = (html) => {
  //   this.setState({
  //     content:html,
  //  })
  // }

  render () {
     const {content,imgurl}=this.state
      const uploadFn = (param) => {
        //const serverURL = FL.PATH.API.ImgUpload
        const serverURL = imgurl
        const xhr = new XMLHttpRequest
        const fd = new FormData()

        const successFn = (response) => {
          param.success({
              url:JSON.parse(xhr.responseText).Data.Src
          })
        }

        const progressFn = (event) => {
          param.progress(event.loaded / event.total * 100)
        }

        const errorFn = (response) => {
          param.error({
            msg: 'unable to upload.'
          })
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)

        fd.append('file', param.file)
        xhr.open('POST', serverURL, true)
        xhr.send(fd)

      }
    const editorProps = {
      height: 500,
      placeholder: this.props.placeholder,
      initialContent: content,
      contentFormat:'html',
      onChange: this.handleChange,
      onHTMLChange: this.props.handleHTMLChange,
      controls :[
        'split', 'font-size', 'font-family', 'text-color',
        'bold', 'italic', 'underline', 'strike-through', 'superscript',
        'subscript', 'text-align', 'split', 'headings', 'list_ul', 'list_ol',
        'blockquote', 'code','media'
      ],
      media :{
        image: true, // 开启图片插入功能
        video: false, // 开启视频插入功能
        audio: false, // 开启音频插入功能
        uploadFn: uploadFn // 指定上传函数
        //uploadFn: null // 指定上传函数
       }
    }
    return (
        <div className="editor">
           <BraftEditor {...editorProps}   ref={instance => this.editorInstance = instance}/>
        </div>
    )
  }
}

export default RichTxtCompent


/*
   使用说明：
   在调用组建页面import此组建
   import RichTxtCompent from '../../CommonCompent/js/RichTxtCompent'

  使用：
  handleHTMLChange = (html) => {
  //html即为输入框内的值内容
  console.log('html',html)
  //   this.setState({
  //     content:html,
  //  })
  }
  //imgurl为图片上传地址
  //content为编辑时候默认接口返回值
  <RichTxtCompent content='123fdd'  placeholder='测试' handleHTMLChange={(html)=>this.handleHTMLChange(html)} imgurl={FL.PATH.API.ImgUpload}/>
*/
