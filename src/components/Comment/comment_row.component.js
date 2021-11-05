// react imports
import React, { useState } from "react";

// custom imports
import CommentContainerTemplate from "../../templates/comment_container.template";
import CommentFooter from "./comment_footer.component";
import UserService from "../../services/user.service";
import {
  CommentHeader,
  CommentContent,
  CommentModifyForm,
} from "./comment.component";

// css
import "../../css/component/comment.component.scss";
import { connect } from "react-redux";

function CommentRow(props) {
  // When click 답글쓰기 -> have to open form

  // states
  const [modificationMode, setModificationMode] = useState(false);
  const [subcommentBtn, setSubcommentBtn] = useState(false);
  const [replyForm, setReplyForm] = useState(true);
  const [modificatedContent, setModificatedContent] = useState("");
  const [userLikeController, setUserLikeController] = useState({
    like: props.comment.user_liked,
    dislike: props.comment.user_disliked,
  });
  const [commentLikeCount, setCommentLikeCount] = useState(
    props.comment.like_count
  );
  const [commentDislikeCount, setCommentDislikeCount] = useState(
    props.comment.dislike_count
  );

  // functions
  function toggleLike() {
    const userController = { ...userLikeController };
    if (userController.dislike) {
      userController.dislike = false;
      setCommentDislikeCount(
        commentDislikeCount > 0 ? commentDislikeCount - 1 : 0
      );
    }
    userController.like = !userLikeController.like;
    if (userController.like) {
      setCommentLikeCount(commentLikeCount + 1);
    } else {
      setCommentLikeCount(commentLikeCount > 0 ? commentLikeCount - 1 : 0);
    }
    setUserLikeController(userController);
    UserService.toggleCommentLike(props.comment.id, { ...userController })
      .then((response) => {
        console.log(response.data);
        console.log(props.comment);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function toggleDislike() {
    const userController = { ...userLikeController };
    if (userController.like) {
      userController.like = false;
      setCommentLikeCount(commentLikeCount > 0 ? commentLikeCount - 1 : 0);
    }

    userController.dislike = !userController.dislike;
    if (userController.dislike) {
      setCommentDislikeCount(commentDislikeCount + 1);
    } else {
      setCommentDislikeCount(
        commentDislikeCount > 0 ? commentDislikeCount - 1 : 0
      );
    }
    setUserLikeController(userController);
    UserService.toggleCommentLike(props.comment.id, { ...userController })
      .then((response) => {
        console.log(response.data);
        console.log(props.comment);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleModificationMode(e) {
    e.preventDefault();
    setModificationMode(!modificationMode);
  }

  function toggleReplyForm(e) {
    e.preventDefault();
    setReplyForm(!replyForm);
  }

  // TODO: e.target.value to CommentTextarea
  function handleUpdateContentChange(e) {
    // modifiy textarea의 height를 동시에 변화시킨다.
    e.preventDefault();
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setModificatedContent(e.target.value);
  }

  function toggleSubcommentBtn(e) {
    e.preventDefault();
    setSubcommentBtn(!subcommentBtn);
  }

  // TODO: Do not refresh after modify content
  function submitModificatedContent(commentId, data) {
    UserService.updateComment(commentId, data)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteComment(commentId) {
    UserService.deleteComment(commentId)
      .then((response) => {
        props.handleDeleteComment(commentId);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <li className="comment_row">
      <div className="comment">
        {/** comment info */}
        <CommentHeader comment={props.comment} />
        {/** comment content || comment modification form */}
        {!modificationMode ? (
          <CommentContent comment={props.comment} />
        ) : (
          <CommentModifyForm
            submitModificatedContent={submitModificatedContent}
            comment={props.comment}
            modificatedContent={modificatedContent}
            handleUpdateContentChange={handleUpdateContentChange}
          />
        )}
        {/** comment footer */}
        <CommentFooter
          comment={props.comment}
          replyForm={replyForm}
          toggleReplyForm={toggleReplyForm}
          handleModificationMode={handleModificationMode}
          deleteComment={deleteComment}
          toggleSubcommentBtn={toggleSubcommentBtn}
          commentLikeCount={commentLikeCount}
          commentDislikeCount={commentDislikeCount}
          toggleLike={toggleLike}
          toggleDislike={toggleDislike}
        />
      </div>
      {/* {replyForm && <CommentForm parent={props.comment.id} />} */}
      {subcommentBtn && (
        <div className="comment__re">
          <CommentContainerTemplate
            parent={props.comment.id}
            replyForm={replyForm}
          />
        </div>
      )}
    </li>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(CommentRow);
