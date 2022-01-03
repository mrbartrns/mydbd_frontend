import React, { useRef, useCallback, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import userService from "../../services/user.service";

function ForumWriteContainer({ isLoggedIn }) {
  // TODO: create tag change
  const history = useHistory();
  const editorRef = useRef();
  const [articleData, setArticleData] = useState({ title: "", tags: [] });
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
        const markdown = editorRef.current.getInstance().getMarkdown();
        const article = {
          title: articleData.title,
          content: markdown,
          tags: articleData.tags,
        };
        const response = await userService.postForumArticle(article);
        const id = response.data.id;
        history.push("/forum/article/" + String(id));
      } catch (error) {
        console.error(error);
      }
    },
    [articleData.tags, articleData.title, history]
  );
  const onChangeTitle = useCallback((e) => {
    setArticleData((c) => {
      return {
        ...c,
        title: e.target.value,
      };
    });
  }, []);
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(ForumWriteContainer);
