import React from "react";
import classNames from "classnames";
import styles from "./GameListArea.scss";
import FlexBox from "../../atoms/FlexBox";
import GameCard from "../../molecules/GameCard/GameCard";
import Paginator from "../../molecules/Paginator";
import { Card } from "react-bootstrap";

const cx = classNames.bind(styles);

const URL_FORMATTER = {
  killers: "killer",
  survivors: "survivor",
  perks: "perk",
  items: "item",
  addons: "addon",
};

function GameListArea({
  listState,
  paginationState,
  onPrev,
  onNext,
  goTo,
  category,
}) {
  return (
    <div className={cx("game-list-area")}>
      <FlexBox>
        {listState.fetchSuccess &&
          listState.list.map((obj) => {
            console.log(URL_FORMATTER[category]);
            return (
              <GameCard
                key={obj.id}
                link={`/${URL_FORMATTER[category]}/${obj.id}`}
                img={null}
              >
                <Card.Title>{obj.name}</Card.Title>
                <Card.Text>{obj.name_kor}</Card.Text>
              </GameCard>
            );
          })}
      </FlexBox>
      <FlexBox className={cx("list-paginator-box")}>
        {listState.fetchSuccess && paginationState.count > 1 && (
          <Paginator
            currentPage={paginationState.currentPage}
            offset={paginationState.offset}
            startIndex={paginationState.startIndex}
            endIndex={paginationState.endIndex}
            count={paginationState.count}
            pageSize={paginationState.pageSize}
            onNext={onNext}
            onPrev={onPrev}
            goTo={goTo}
          />
        )}
      </FlexBox>
    </div>
  );
}

export default GameListArea;
