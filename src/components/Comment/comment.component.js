// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports
import CommentForm from "./form.component";
import CommentBox from "./comment_box.component";

// css
import "../../css/component/comment.component.scss";

// TODO: CommentPagination 만들기

function CommentComponent(props) {
  return (
    <div className="comment-container">
      {/** Form Component
       * Form Component only displays when user logged in
       */}
      {!props.parent && <CommentForm parent={props.parent} />}

      {/** Comment Component */}
      <CommentBox
        nullPage={props.nullPage}
        parent={props.parent}
        comments={props.comments}
        loaded={props.loaded}
        handleDeleteComment={props.handleDeleteComment}
      />
      {/** Here goes pagination component */}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentComponent);
