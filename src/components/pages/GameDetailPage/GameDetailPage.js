import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import GameDetailTemplate from "../../templates/GameDetailTemplate";
import { Helmet } from "react-helmet";
import GameDetailContainer from "../../../containers/GameDetailContainer/GameDetailContainer";
function GameDetailPage({ match }) {
  return (
    <PageTemplate>
      <Helmet>
        <title>정보 - MYDBD</title>
      </Helmet>
      <GameDetailTemplate>
        <GameDetailContainer category={match.params.category} />
      </GameDetailTemplate>
    </PageTemplate>
  );
}

export default GameDetailPage;
