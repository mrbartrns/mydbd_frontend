import React from "react";
import { Route } from "react-router-dom";
import ForumPostTemplate from "../templates/forum_post.template";
import ForumEditTemplate from "../templates/forum_edit.template";
import ForumListPage from "../components/pages/ForumListPage";
import ForumDetailPage from "../components/pages/ForumDetailPage";

function ForumRoute({ match }) {
  return (
    <>
      <Route exact path={`${match.url}/write`} component={ForumPostTemplate} />
      <Route exact path={`${match.url}`} component={ForumListPage} />
      <Route
        exact
        path={`${match.url}/article/:id`}
        component={ForumDetailPage}
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
