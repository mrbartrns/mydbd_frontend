// react imports
import React from "react";
import { connect } from "react-redux";

// custom imports
import CommentBox from "./comment_box.component";
import CommentForm from "./form.component";
import CommentNavbar from "./comment_navbar.component";
import Paginator from "../../templates/paginator_standard1.template";

// css
import "../../css/component/comment.component.scss";

// TODO: CommentPagination 만들기

function CommentComponent(props) {
  return (
    props.loaded && (
      <div className="comment-container">
        {/** Form Component
         * Form Component only displays when user logged in
         */}
        {!props.parent && (
          <CommentForm
            parent={props.parent}
            setCurrentPage={props.setCurrentPage}
            setSortBy={props.setSortBy}
            setRefresh={props.setRefresh}
            refresh={props.refresh}
          />
        )}
        {/** temp */}
        {!props.parent && (
          <CommentNavbar
            sortBy={props.sortBy}
            setSortBy={props.setSortBy}
            setRefresh={props.setRefresh}
            setCurrentPage={props.setCurrentPage}
            refresh={props.refresh}
          />
        )}
        {
          /** Comment Component */
          <CommentBox
            nullPage={props.nullPage}
            parent={props.parent}
            comments={props.comments}
            loaded={props.loaded}
            refreshAfterDeleteComment={props.refreshAfterDeleteComment}
          />
        }

        {props.loaded && (
          <Paginator
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
            counts={props.counts}
          />
        )}
      </div>
    )
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentComponent);
