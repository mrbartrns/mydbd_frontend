import React from "react";
// import classNames from "classnames/bind";
// import styles from "./ForumDetailPage.scss";
import PageTemplate from "../../templates/PageTemplate";
import ForumDetailTemplate from "../../templates/ForumDetailTemplate";
import ForumContentContainer from "../../../containers/ForumContentContainer/ForumContentContainer";

function ForumDetailPage() {
  return (
    <PageTemplate>
      {/** Helmet
       * Helmet has to contain meta data of article (og title, image ...)
       */}
      <ForumDetailTemplate>
        <ForumContentContainer />
        {/** CommentContainer */}
      </ForumDetailTemplate>
    </PageTemplate>
  );
}

export default ForumDetailPage;
