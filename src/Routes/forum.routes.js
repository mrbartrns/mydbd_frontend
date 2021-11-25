import React from "react";
import { Route } from "react-router-dom";

import ForumPostTemplate from "../templates/forum_post.template";
function Forum({ match }) {
  return (
    <>
      <Route exact path={`${match.url}/write`} component={ForumPostTemplate} />
    </>
  );
}
