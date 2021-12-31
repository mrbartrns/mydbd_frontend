import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import GameDetailTemplate from "../../templates/GameDetailTemplate";
import { Helmet } from "react-helmet";
import GameDetailContainer from "../../../containers/GameDetailContainer/GameDetailContainer";
import GameCommentContainer from "../../../containers/GameCommentContainer/GameCommentContainer";

function GameDetailPage({ match }) {
  return (
    <PageTemplate>
      <Helmet>
        <title>정보 - MYDBD</title>
        <meta property="og:title" content="정보 - MYDBD" />
      </Helmet>
      <GameDetailTemplate>
        <GameDetailContainer category={match.params.category} />
        <h2>댓글</h2>
        <GameCommentContainer />
      </GameDetailTemplate>
    </PageTemplate>
  );
}

export default GameDetailPage;
