import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";
import userService from "../services/user.service";

// TODO: integrate with post article component
function ForumEditTemplate(props) {
  const location = useLocation();
  const history = useHistory();
  const editRef = useRef();
  // TODO: set title response value to input element
  const [title, setTitle] = useState("");
  // const [isAuthenticated, SetIsAuthenticated] = useState(false);
  // TODO: tag -> new element
  function handleTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    userService
      .updateForumArticle(location.pathname, {
        title: title,
        content: editRef.current.getInstance().getMarkdown(),
      })
      .then((response) => {
        history.push("/forum/article/" + props.match.params.id);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      userService
        .getForumArticle(location.pathname)
        .then((response) => {
          editRef.current.getInstance().setMarkdown(response.data.content);
          setTitle(response.data.title);
          // SetIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert("권한이 없습니다.");
            history.goBack();
          } else {
            console.error(error);
            if (error.response && error.response.data) {
              console.log(error.response.data);
            }
          }
        });
    }
    return () => {
      mounted = false;
    };
  }, [location, history]);
  return (
    <div>
      <h1>글 수정</h1>
      <form className="post_wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          className="title"
          value={title}
          onChange={handleTitleChange}
        />
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          usageStatistics={false}
          placeholder="자유롭게 글쓰세요!"
          ref={editRef}
        />
        <input type="submit" value="수정하기" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.authReducer;
  return { isLoggedIn, user };
}

export default connect(mapStateToProps)(ForumEditTemplate);
