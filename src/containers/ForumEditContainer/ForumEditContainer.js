import React, { useRef, useCallback, useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useHistory, useLocation } from "react-router-dom";
import ForumEditor from "../../components/organisms/ForumEditor";

function ForumEditContainer() {
  const history = useHistory();
  const location = useLocation();
  const editorRef = useRef();
  const [articleData, setArticleData] = useState({ title: "", tags: [] });
  const getFetchArticle = useCallback(async () => {
    try {
      const response = await userService.getForumArticle(location.pathname);
      editorRef.current.getInstance().setMarkdown(response.data.content);
      setArticleData((c) => {
        return {
          ...c,
          title: response.data.title,
          tags: [...response.data.tags],
        };
      });
    } catch (error) {
      console.error(error);
    }
  }, [location.pathname]);
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
        const response = await userService.updateForumArticle(
          location.pathname,
          article
        );
        const id = response.data.id;
        history.push("/forum/article/" + String(id));
      } catch (error) {
        console.error(error);
      }
    },
    [articleData.tags, articleData.title, history, location.pathname]
  );
  const onChangeTitle = useCallback((e) => {
    setArticleData((c) => {
      return {
        ...c,
        title: e.target.value,
      };
    });
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getFetchArticle();
    }
    return () => {
      mounted = false;
    };
  }, [getFetchArticle]);
  return (
    <ForumEditor
      articleData={articleData}
      uploadImage={uploadImage}
      editorRef={editorRef}
      onChangeTitle={onChangeTitle}
      onSubmit={onSubmit}
    />
  );
}

export default ForumEditContainer;
