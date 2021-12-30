import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./GameCard.scss";

const imgPlaceholder = "http://placehold.it/300x300";

const cx = classNames.bind(styles);

function GameCard({ link, img, styles, className, children, ...rest }) {
  return (
    <Link to={link} className={cx("game-card", className)} {...rest}>
      <Card>
        <Card.Img variant="top" src={img ? img : imgPlaceholder} />
        <Card.Body>{children}</Card.Body>
      </Card>
    </Link>
  );
}

export default GameCard;
