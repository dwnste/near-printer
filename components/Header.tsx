import React from "react";
import styled from "styled-components";

import Link from "./Link";

const Header: React.FC = () => {
  return (
    <Container>
      <Logo.Container>
        <Logo.Badge>testnet</Logo.Badge>
        <Logo.Title>Nonofficial NEAR Printer</Logo.Title>
      </Logo.Container>
      <StyledLink
        title="GitHub repository link"
        href="https://github.com/dwnste/near-printer"
      >
        GitHub ↗
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #222222;
  border-bottom: 1px solid #444;
`;

const Logo = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  Title: styled.a.attrs({
    title: "Nonofficial NEAR Printer",
    href: "/",
  })`
    display: block;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 20px;
    color: white;
  `,
  Badge: styled.a.attrs({
    title: "Testnet documentation link",
    href: "https://docs.near.org/concepts/basics/networks#testnet",
    target: "_blank",
  })`
    user-select: none;
    margin-right: 10px;
    padding: 10px;
    border-radius: 18px;
    color: white;
    background-color: hsla(0, 0%, 100%, 0.1);
    font-size: 15px;
    font-weight: bold;
    font-family: monospace;
  `,
};

const StyledLink = styled(Link)`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export default Header;
