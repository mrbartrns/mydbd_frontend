// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports
import CommentForm from "./form.component";
import CommentBox from "./comment_box.component";
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
      {!props.parent && (
        <CommentForm
          parent={props.parent}
          setCurrentPage={props.setCurrentPage}
          setSortBy={props.setSortBy}
        />
      )}
      {/** temp */}
      {!props.parent && (
        <ul>
          <li>인기순</li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.setSortBy("recent");
            }}
          >
            최신순
          </li>
        </ul>
      )}
      {/** Comment Component */}
      <CommentBox
        nullPage={props.nullPage}
        parent={props.parent}
        comments={props.comments}
        loaded={props.loaded}
        handleDeleteComment={props.handleDeleteComment}
      />
      {/** Here goes pagination component */}
      <Paginator
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
        counts={props.counts}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentComponent);
