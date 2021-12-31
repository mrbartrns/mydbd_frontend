import React, { useRef, useCallback, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Editor } from "@toast-ui/react-editor";
import userService from "../services/user.service";
import "@toast-ui/editor/dist/toastui-editor.css";
// TODO: set title, plain text
// set Image editor

const HTTP_401_UNAUTHORIZED_MESSAGE = "로그인이 필요한 화면입니다.";

function ForumPostTemplate({ isLoggedIn }) {
  const history = useHistory();
  const ref = useRef();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

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

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const markdown = ref.current.getInstance().getMarkdown();
        const article = {
          title: title,
          content: markdown,
          tags: tags,
        };
        const response = await userService.postForumArticle(article);
        history.push("/forum/article/" + String(response.data.id));
      } catch (error) {
        // TODO: React redux error message reducer
        if (error.response && error.response.data) {
          console.log(error.response.data);
          if (error.response.data.title) {
            console.log(error.response.data.title);
          }
          if (error.response.data.content) {
            console.log(error.response.data.content);
          }
        }
        console.error(error);
      }
    },
    [history, title, tags]
  );

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  return (
    <div>
      <h1>글쓰기</h1>
      <form className="post_wrapper" onSubmit={onSubmit}>
        {/** Here goes navbar */}
        <div className="title_wrapper">
          <input type="text" onChange={onChangeTitle} />
        </div>
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
