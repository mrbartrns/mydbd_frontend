import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ForumListComponent from "../components/Forum/forum_list.component";

import userService from "../services/user.service";

function ForumListTemplate(props) {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let mount = true;
    if (mount) {
      userService
        .getForumList()
        .then((response) => {
          setPosts(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return () => {
      mount = false;
    };
  }, []);

  return <ForumListComponent posts={posts} setPosts={setPosts} />;
}

export default ForumListTemplate;
