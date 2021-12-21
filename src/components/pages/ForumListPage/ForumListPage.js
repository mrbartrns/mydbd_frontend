import React from "react";
import ForumListTemplate from "../../../templates/forum_list.template";
import PageTemplate from "../../templates/PageTemplate";

function ForumListPage() {
  return (
    <PageTemplate>
      {/** Helmet */}
      <ForumListTemplate>{/** ForumListContainer */}</ForumListTemplate>
    </PageTemplate>
  );
}

export default ForumListPage;
