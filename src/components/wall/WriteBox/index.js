import React, {Component} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Card} from "reactstrap"
import TextField from '@material-ui/core/TextField';
import Dropzone from 'react-dropzone';
// import Divider from '@material-ui/core/Divider';
import RadioButton from 'RadioButton/RadioButtonsGroup'
import 'react-dropzone-uploader/dist/styles.css';
// import Dropzone from 'react-dropzone-uploader'
import Checkbox from '@material-ui/core/Checkbox';

class WriteBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      commentText: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      rejected: [],
      isOpen: false,
      radioValue:'',
      files:{},
      floors: [],
      fileValue:""
    }
  }
  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    // console.log("previewImage", file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  onDrop = files => {
  
    // console.log("file-->", this.state.fileList)
   const arry =  this.state.fileList.push(files);
  //  console.log(arry);
    this.setState({
      fileList: this.state.fileList
    });
 
  };

   handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta)
  }
  handleChange = ({fileList}) => {
    // console.log("fileList", fileList)
    this.setState({fileList})
  }

  handleClickImage() {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen
    }));
  }

  handleRadio = (e) => {
 
    this.setState({radioValue:e.target.value});
   
  }
  // handleSubmit = (files, allFiles) => {
  //   console.log(files.map(f => f.meta))
  //   allFiles.forEach(f => f.remove())
  // }
  handleAddPost() { 
    if(this.props.addImage){
      this.props.addPost({msg:this.state.commentText,type:this.state.radioValue,document:this.state.filePrams})
    }else{ 
    this.props.addPost(this.state.commentText);
    }
    this.setState({
      commentText: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      isOpen: false,
      fileValue:"",
      filePrams:"",
      default_content:false
    });
  }

  onChange(e) {
    this.setState({commentText: e.target.value})
  }

  // getUploadParams = () => {
  //   return { url: 'https://httpbin.org/post' }
  // }
  getUploadParams = (e) => {
    this.setState({
      fileValue:e.target.value,
      filePrams:e.target.files[0]
    })
  }
// removePreviewImage(index){
//   this.state.fileList.splice(index, 1);
//   this.setState(this.state.fileList)
// }
  render() {

 

    const { fileList} = this.state;
    // console.log("this.state.fileList.length", fileList.length)
    const isEnabled = typeof this.state?.filePrams === "undefined" && this.state.commentText === "";

    return (
      <Card className="jr-card">
        <div ><h3 style={{fontWeight:'bold'}}>{this.props.chatHeading}</h3></div>
        <div className="media mb-2">
          <Avatar className="size-50 mr-3" src={this.props.user.image}/>
          <div className="media-body">
            <TextField
              id="exampleTextarea"
              placeholder="Whats in your mind?" 
              label="Whats in your mind?"
              value={this.state.commentText} 
              onChange={(event) => this.onChange(event)}
              multiline
              fullWidth
              className="jr-wall-textarea"
              margin="none"
              variant="outlined"
              rows="4"
            />
          </div>
        </div>
        {/* {console.log(this.props.addImage)} */}
        <div className="jr-clearfix">
          
        {/* { this.props.addImage === true ? */}
        
        <div style={{display:"flex",    marginLeft: "62px"}}>
          {this.state.isOpen === true  || this.state.radioValue ==='email'? <div className="d-flex flex-row">
              <ul className="list-inline mb-3 mr-2">
                {/* {fileList.map((user, index) =>
                  <li className="mb-1 mr-0 list-inline-item align-top" key={index} >

                    <img alt="..." className="size-60 rounded" src={user[0].preview} onClick={(index)=>{
                       let fileList = this.state.fileList.filter(index => index[0].preview !== user[0].preview);
                        this.setState(fileList)
                    }}/>
                  </li>
                )
                } */}
              </ul>
              <input type="file" maxFiles={3} multiple="multiple"   value={this.state.fileValue} maxFilesize="20" onChange={this.getUploadParams} />
              {/* <Checkbox style={{padding:0}}
                                            checked={this.state.default_content}
                                            onChange={(e) => {
                                              let state = this.state;
                                              state.default_content = e.target.checked;
                                              if(e.target.checked){
                                                state.commentText = "Hi send quote to client"
                                              }
                                              else{
                                                state.commentText = '';
                                              }
                                              this.setState({
                                                ...state
                                              })
                                            }}
                                            color="primary"
                                          /> */}
              {/* <Dropzone 
                className="jr-wall-dropzone" maxFilesize="20" onDrop={this.onDrop} multiple><i className="zmdi zmdi-collection-image"/>
                </Dropzone> */}
                    {/* <Dropzone
      getUploadParams={this.getUploadParams}
      onChangeStatus={this.handleChangeStatus}
      maxFiles={3}
      maxFilesize="20"
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    /> */}
            </div> 
            
            : null}
            </div>
            {/* :
            null} */}
            
          {/* <Divider/> */}

          {/* <Modal isOpen={previewVisible} toggle={this.handleCancel}>
            <ModalHeader toggle={this.toggle}>Slide Show</ModalHeader>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal> */}
        </div>
        <div className="row">
        <div className="col-12 col-lg-8 col-md-12 ml-xs" style={{display:'flex',justifyContent:'center'}}>
        {/* {this.props.addImage === true && this.state.radioValue=='email' ?
          <div className="pointer" onClick={this.handleClickImage.bind(this)}>
            <i className="zmdi zmdi-camera mr-2 jr-fs-xl d-inline-flex align-middle"/>
            <span className="jr-fs-sm"> Attachment </span>
          </div>
          : null} */}
             { this.props.addImage === true ?
         
         <RadioButton handleRadio={this.handleRadio}  /> 
         
         : null}
</div>
<div className="col-12  col-lg-4 col-md-12" style={{display:'flex',justifyContent:'flex-end',padding:"10px 20px"}}> 
          <Button  variant="contained" color="primary" size='small' 
                  disabled={(isEnabled) ? "disabled" : ""} 
                  onClick={this.handleAddPost.bind(this)}>Send
          </Button>
          
        </div>
        </div>
        {/* { this.props.addImage === true ?
         
        <RadioButton handleRadio={this.handleRadio}  />
        
        : null} */}
       {/* {console.log(this.props.value)} */}
      </Card>
    )
  }
}

export default WriteBox;
