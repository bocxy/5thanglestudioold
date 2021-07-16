import React, {Component} from "react";
// import PostItem from "./PostItem";
import WriteBox from "../../../components/wall/WriteBox/index";
import Auxiliary from "../../../util/Auxiliary";

class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      postList: [],
      user: {} 
    }
  }


  componentWillMount() {
    // this.setState({postList: this.props.postList, user: this.props.user})
  }


  addPost(commentText) { 
    if(this.props.addImage){
      this.props.clientCommunication(commentText)
    }else{ 
      const post = {
        text: commentText
      }; 
    this.props.sendMsg(post);
    }
    
    // console.log("Post Data :==()==>", commentText)
    // let postArray = this.state.postList;
    // postArray.unshift(post);
    // this.setState({
    //   postList: postArray
    // });

  }

  render() {
    return (
      <Auxiliary>
        <WriteBox addPost={this.addPost.bind(this)} user={this.state.user} chatHeading={this.props.chatHeading} addImage={this.props.addImage}/>
     
      </Auxiliary>
    )
  }
}

export default PostList
