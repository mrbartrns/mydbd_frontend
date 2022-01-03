import React from "react";
// import classNames from "classnames/bind";
// import styles from "./ForumDetailPage.scss";
import PageTemplate from "../../templates/PageTemplate";
import ForumDetailTemplate from "../../templates/ForumDetailTemplate";
import ForumContentContainer from "../../../containers/ForumContentContainer/ForumContentContainer";
import ForumCommentContainer from "../../../containers/ForumCommentContainer/ForumCommentContainer";
import { Helmet } from "react-helmet";
function ForumDetailPage({ match }) {
  return (
    <PageTemplate>
      {/** Helmet
       * Helmet has to contain meta data of article (og title, image ...)
       */}
      <Helmet>
        <title>글 수정 - MYDBD</title>
      </Helmet>
      <ForumDetailTemplate urlParams={match.params}>
        <ForumContentContainer />
        <ForumCommentContainer />
      </ForumDetailTemplate>
    </PageTemplate>
  );
}

export default ForumDetailPage;
