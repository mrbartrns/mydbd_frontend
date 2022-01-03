import React from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import styles from "./ForumEditPage.scss";
import PageTemplate from "../../templates/PageTemplate";
import ForumPostTemplate from "../../templates/ForumPostTemplate";
import ForumEditContainer from "../../../containers/ForumEditContainer/ForumEditContainer";

const cx = classNames.bind(styles);

function ForumEditPage() {
  return (
    <PageTemplate clasName={cx("forum-edit-page")}>
      <Helmet>
        <title>글 수정 - MYDBD</title>
      </Helmet>
      <ForumPostTemplate>
        <h1>게시글 수정하기</h1>
        <ForumEditContainer />
      </ForumPostTemplate>
    </PageTemplate>
  );
}

export default ForumEditPage;
