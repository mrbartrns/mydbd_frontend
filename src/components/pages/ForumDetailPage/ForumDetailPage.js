import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import ForumDetailTemplate from "../../templates/ForumDetailTemplate";
import ForumContentContainer from "../../../containers/ForumContentContainer/ForumContentContainer";
import ForumCommentContainer from "../../../containers/ForumCommentContainer/ForumCommentContainer";
import { Helmet } from "react-helmet";
function ForumDetailPage() {
  return (
    <PageTemplate>
      <Helmet>
        <title>글 수정 - MYDBD</title>
      </Helmet>
      <ForumDetailTemplate>
        <ForumContentContainer />
        <ForumCommentContainer />
      </ForumDetailTemplate>
    </PageTemplate>
  );
}

export default ForumDetailPage;
