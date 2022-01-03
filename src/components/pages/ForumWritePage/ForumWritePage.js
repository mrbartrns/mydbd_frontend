import React from "react";
import classNames from "classnames";
import styles from "./ForumWritePage.scss";
import PageTemplate from "../../templates/PageTemplate";
import { Helmet } from "react-helmet";
import ForumPostTemplate from "../../templates/ForumPostTemplate";

const cx = classNames.bind(styles);

function ForumWritePage() {
  return (
    <PageTemplate className={cx("forum-write-page")}>
      <Helmet>
        <title>게시글 작성 - MYDBD</title>
      </Helmet>
      <ForumPostTemplate></ForumPostTemplate>
    </PageTemplate>
  );
}

export default ForumWritePage;
