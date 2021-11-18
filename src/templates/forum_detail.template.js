import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ForumDetailComponent from "../components/Forum/forum_detail.component";
import userService from "../services/user.service";

function ForumDetailTemplate(props) {
  const location = useLocation();
  console.log(location);
  const [article, setArticle] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLoaded(false);
      userService
        .getForumArticle(location.pathname, {})
        .then((response) => {
          setArticle(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          setLoaded(true);
          console.error(error);
        });
    }
    return () => {
      mounted = false;
    };
  }, [location]);
  return loaded && <ForumDetailComponent article={article} />;
}

export default ForumDetailTemplate;
