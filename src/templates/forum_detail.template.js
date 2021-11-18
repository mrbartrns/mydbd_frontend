import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import userService from "../services/user.service";

function ForumDetailTemplate(props) {
  const location = useLocation();
  console.log(location);
  const [article, setArticle] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      userService.getForumArticle(location.pathname, {}).then((response) => {
        console.log(response.data);
      });
    }
    return () => {
      mounted = false;
    };
  }, [location]);
  return <div></div>;
}

export default ForumDetailTemplate;
