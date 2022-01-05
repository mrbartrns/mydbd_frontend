import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute/PrivateRoute";
import ForumWritePage from "../components/pages/ForumWritePage";
import ForumEditPage from "../components/pages/ForumEditPage";
import ForumListPage from "../components/pages/ForumListPage";
import ForumDetailPage from "../components/pages/ForumDetailPage";

function ForumRoute({ match }) {
  return (
    <>
      <PrivateRoute
        exact
        path={`${match.url}/write`}
        component={ForumWritePage}
      />
      <Route exact path={`${match.url}`} component={ForumListPage} />
      <Route
        exact
        path={`${match.url}/article/:id`}
        component={ForumDetailPage}
      />
      <PrivateRoute
        exact
        path={`${match.url}/article/:id/edit`}
        component={ForumEditPage}
      />
    </>
  );
}

export default ForumRoute;
