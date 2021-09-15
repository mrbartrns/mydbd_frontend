import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  border-bottom: 1px solid black;
  z-index: 10;
  color: black;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  padding: 0 1rem;
  height: 100%;

  &:hover {
    background-color: #dee2e6;
    border-radius: 4px;
    color: #6c757d;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 1rem;
  height: 100%;
  h1 {
    color: #264653;
    font-size: 2rem;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  /* padding: 1rem 0.5rem; */
  height: 100%;
  align-items: center;
  /* margin-right: -24px; */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  font-size: 1.8rem;
  /* position: absolute;
  top: 0;
  right: 0; */
  margin: 0 1rem;
  cursor: pointer;
  transform: translage(-100%, 75%);

  &:hover {
    color: #6c757d;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
