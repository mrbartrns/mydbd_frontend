import React from "react";
import ForumListTemplate from "../../templates/ForumListTemplate";
import PageTemplate from "../../templates/PageTemplate";
import ForumListContainer from "../../../containers/ForumListContainer";
import { Helmet } from "react-helmet";

function ForumListPage() {
  return (
    <PageTemplate>
      {/** Helmet */}
      <Helmet>
        <title>포럼-MYDBD</title>
        <meta property="og:title" content="포럼-MYDBD" />
      </Helmet>
      <ForumListTemplate>
        <ForumListContainer />
      </ForumListTemplate>
    </PageTemplate>
  );
}

export default ForumListPage;
