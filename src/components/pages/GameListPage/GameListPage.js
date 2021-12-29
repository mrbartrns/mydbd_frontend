import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Helmet } from "react-helmet";

function GameListPage() {
  return (
    <PageTemplate>
      <Helmet>게임 정보 - MYDBD</Helmet>
    </PageTemplate>
  );
}

export default GameListPage;
