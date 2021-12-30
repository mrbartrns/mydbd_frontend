import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import GameListTemplate from "../../templates/GameListTemplate/GameListTemplate";
import GameListContainer from "../../../containers/GameListContainer/GameListContainer";
import { Helmet } from "react-helmet";

const matchedCategory = (category) => {
  switch (category) {
    case "killers":
      return "살인마";
    case "survivors":
      return "생존자";
    case "perks":
      return "퍽";
    case "items":
      return "아이템";
    case "addons":
      return "애드온";
    default:
      return null;
  }
};

function GameListPage({ match }) {
  return (
    <PageTemplate>
      <Helmet>
        <title>{matchedCategory(match.params.category)} 정보 - MYDBD</title>
      </Helmet>
      <GameListTemplate category={matchedCategory(match.params.category)}>
        <GameListContainer category={match.params.category} />
      </GameListTemplate>
    </PageTemplate>
  );
}

export default GameListPage;
