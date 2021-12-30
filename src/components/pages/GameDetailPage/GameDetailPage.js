import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import GameDetailTemplate from "../../templates/GameDetailTemplate";
import { Helmet } from "react-helmet";

function GameDetailPage({ match }) {
  console.log(match);
  return (
    <PageTemplate>
      <Helmet>
        <title>정보 - MYDBD</title>
      </Helmet>
      <GameDetailTemplate>{/* GameDetailContainer */}</GameDetailTemplate>
    </PageTemplate>
  );
}

export default GameDetailPage;
