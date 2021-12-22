import React from "react";
import classNames from "classnames/bind";
import styles from "./ForumDetailPage.scss";
import PageTemplate from "../../templates/PageTemplate";
import ForumDetailTemplate from "../../templates/ForumDetailTemplate";

const cx = classNames.bind(styles);

function ForumDetailPage() {
  return (
    <PageTemplate>
      {/** Helmet
       * Helmet has to contain meta data of article (og title, image ...)
       */}
      <ForumDetailTemplate>
        {/** DetailContainer */}
        {/** CommentContainer */}
      </ForumDetailTemplate>
    </PageTemplate>
  );
}

export default ForumDetailPage;
