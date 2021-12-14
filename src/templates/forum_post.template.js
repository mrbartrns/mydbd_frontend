import React, { useRef, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import userService from "../services/user.service";

function ForumPostTemplate(props) {
  const history = useHistory();
  const ref = useRef();

  const uploadImage = useCallback(async (blob) => {
    try {
      const formData = new FormData();
      formData.append("image", blob);
      const response = await userService.uploadImage(formData);
      return response.data.image;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  }, []);

  // TODO: Create title, tags field
  function handleSubmit(e) {
    e.preventDefault();
    const markdownValue = ref.current.getInstance().getMarkdown();
    const data = {
      title: "test title",
      content: markdownValue,
      tags: [],
    };
    userService
      .postForumArticle(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  }
  if (!props.isLoggedIn) {
    return (
      <div>
        로그인이 필요합니다.
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          돌아가기
        </button>
      </div>
    );
  }
  return (
    <div>
      <h1>글쓰기</h1>
      <form className="post_wrapper" onSubmit={handleSubmit}>
        {/** Here goes navbar */}
        <div className="editor_wrapper">
          <Editor
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            usageStatistics={false}
            placeholder="자유롭게 글쓰세요!"
            ref={ref}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                const imgUrl = await uploadImage(blob);
                callback(imgUrl, "alt text");
                return false;
              },
            }}
          />
        </div>
        <input type="submit" value="글쓰기" />
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(ForumPostTemplate);
