import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import ForumListComponent from "../components/Forum/forum_list.component";

import userService from "../services/user.service";

// TODO: Pagination 적용
function ForumListTemplate(props) {
  // const location = useLocation();
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

  return <ForumListComponent posts={posts} setPosts={setPosts} />;
}

export default ForumListTemplate;
