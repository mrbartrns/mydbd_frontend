// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports
import CommentBox from "./comment_box.component";
import CommentForm from "./form.component";
import CommentNavbar from "./comment_navbar.component";
import Paginator from "./comment_paginator.component";

// css
import "../../css/component/comment.component.scss";

// TODO: CommentPagination 만들기

function CommentComponent(props) {
  return (
    <div className="comment-container">
      {/** Form Component
       * Form Component only displays when user logged in
       */}
      {!props.replyForm && (
        <CommentForm
          parent={props.parent}
          setCurrentPage={props.setCurrentPage}
          setSortBy={props.setSortBy}
          setRefresh={props.setRefresh}
        />
      )}
      {/** temp */}
      {props.loaded && !props.parent && (
        <CommentNavbar
          sortBy={props.sortBy}
          setSortBy={props.setSortBy}
          setRefresh={props.setRefresh}
        />
      )}
      {
        /** Comment Component */
        props.loaded && (
          <CommentBox
            nullPage={props.nullPage}
            parent={props.parent}
            comments={props.comments}
            loaded={props.loaded}
            handleDeleteComment={props.handleDeleteComment}
          />
        )
      }

      {props.loaded && (
        <Paginator
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          counts={props.counts}
        />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentComponent);
