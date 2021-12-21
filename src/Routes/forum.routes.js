import React from "react";
import { Route } from "react-router-dom";

import ForumPostTemplate from "../templates/forum_post.template";
import ForumListTemplate from "../templates/forum_list.template";
import ForumDetailTemplate from "../templates/forum_detail.template";
import ForumEditTemplate from "../templates/forum_edit.template";
function ForumRoute({ match }) {
  return (
    <>
      <Route exact path={`${match.url}/write`} component={ForumPostTemplate} />
      <Route exact path={`${match.url}`} component={ForumListTemplate} />
      <Route
        exact
        path={`${match.url}/article/:id`}
        component={ForumDetailTemplate}
      />
      <Route
        exact
        path={`${match.url}/article/:id/edit`}
        component={ForumEditTemplate}
      />
    </>
  );
}

export default ForumRoute;
