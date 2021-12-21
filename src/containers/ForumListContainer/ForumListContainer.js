import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import userService from "../../services/user.service";
import ForumListArea from "../../components/organisms/ForumListArea";

function ForumListContainer() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // TODO: Modify api with query string for pagination
    let mount = true;
    if (mount) {
      userService
        .getForumList()
        .then((response) => {
          setPosts(response.data.results);
        })
        .catch((error) => {
          // error status === 401 이면 다시 불러오도록 설정한다.
          if (error.response.status === 401) {
            history.go(0);
          }
          console.log(error.response);
        });
    }
    return () => {
      mount = false;
    };
  }, [history]);
  return <ForumListArea posts={posts} />;
}

export default ForumListContainer;
