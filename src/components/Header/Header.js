import React from "react";
import styled from "styled-components";
import Link from "../Link/Link";
import logo from "./react.svg";

const Container = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 20px;
  color: #555;
`;

const Header = () => (
  <div>
    <Container>
      <img
        src={logo}
        className="Header-logo"
        alt="logo"
        style={{ height: "80px" }}
      />
      <h2>Welcome to project frontend starter</h2>
      <h3>Implemented with Razzle + After.js</h3>
    </Container>
    <Link to="/">Home</Link> - <Link to="/about">About</Link> -
    <Link to="/terms">Terms</Link>
  </div>
);

export default Header;
