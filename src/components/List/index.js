import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { connect } from "react-redux";
import Paginator from "../pagination.component";
import { ListContainer, ContentContainer, ContentItem } from "./list.component";

function ListComponent(props) {
  const location = useLocation();
  const params = useParams();
  const getDetailUrl = (category) => {
    switch (category) {
      case "killers":
        return "killer";
      case "survivors":
        return "survivor";
      case "perks":
        return "perk";
      case "items":
        return "item";
      case "addons":
        return "addon";
      default:
        return "error";
    }
  };
  return (
    <ListContainer>
      <ContentContainer>
        {props.loaded &&
          props.posts.map((data, idx) => {
            const src = data.images.length > 0 ? data.images[0].image : null;
            return (
              <ContentItem key={idx}>
                <img src={src} alt={data.name} />
                <Link to={"/" + getDetailUrl(params.category) + "/" + data.id}>
                  {data.name}
                </Link>
                <p>{data.name_kor}</p>
              </ContentItem>
            );
          })}
      </ContentContainer>
      {props.posts.length > 0 && (
        <Paginator url={location.pathname + "?page="} />
      )}
    </ListContainer>
  );
}

function mapStateToProps(state) {
  const { currentPage, start, end, total, count } = state.paginationReducer;
  return { currentPage, start, end, total, count };
}

export default connect(mapStateToProps)(ListComponent);
