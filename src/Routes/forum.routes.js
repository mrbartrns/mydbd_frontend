import React from "react";
import { Route } from "react-router-dom";
import ForumWritePage from "../components/pages/ForumWritePage";
import ForumEditPage from "../components/pages/ForumEditPage";
import ForumListPage from "../components/pages/ForumListPage";
import ForumDetailPage from "../components/pages/ForumDetailPage";

function ForumRoute({ match }) {
  return (
    <>
      <Route exact path={`${match.url}/write`} component={ForumWritePage} />
      <Route exact path={`${match.url}`} component={ForumListPage} />
      <Route
        exact
        path={`${match.url}/article/:id`}
        component={ForumDetailPage}
      />
      <Route
        exact
        path={`${match.url}/article/:id/edit`}
        component={ForumEditPage}
      />
    </>
  );
}

export default ForumRoute;
