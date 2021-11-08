// react imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

// custom imports
import UserService from "../services/user.service";
import DetailComponent from "../components/Detail/detail.component";
import CommentContainerTemplate from "./comment_container.template";

// css
import "../css/component/detail.component.scss";

function DetailTemplate(props) {
  const location = useLocation();
  const [article, setArticle] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const source = UserService.getCancelToken();
    const queries = {};
    queries["cancelToken"] = source.token;
    let mounted = true;
    if (mounted) {
      setLoaded(false);
      UserService.getApiDetail(location.pathname).then((response) => {
        setArticle(response.data);
        setLoaded(true);
        console.log(response.data);
      });
    }
    return () => {
      mounted = false;
      UserService.unsubscribe();
    };
  }, [location]);
  return (
    <div className="content_container">
      <DetailComponent post={article} loaded={loaded} />
      <CommentContainerTemplate />
    </div>
  );
}

export default DetailTemplate;
