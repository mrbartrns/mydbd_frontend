import styled from "styled-components";
// import { Link } from "react-router-dom";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ContentItem = styled.li`
  list-style: none;
  border: 1px solid black;
  border-radius: 4px;
  min-width: 20vw;
  padding: 1rem 2rem;
  margin: 2rem 2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */

  &:hover {
    background-color: #e5e5e5;
  }
`;
