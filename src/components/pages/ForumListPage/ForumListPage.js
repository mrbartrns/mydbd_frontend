import React from "react";
import ForumListTemplate from "../../templates/ForumListTemplate";
import PageTemplate from "../../templates/PageTemplate";
import ForumListContainer from "../../../containers/ForumListContainer";

function ForumListPage() {
  return (
    <PageTemplate>
      {/** Helmet */}
      <ForumListTemplate>
        <ForumListContainer />
      </ForumListTemplate>
    </PageTemplate>
  );
}

export default ForumListPage;
