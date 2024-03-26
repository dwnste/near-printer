import React from "react";
import styled from "styled-components";

export const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo.Container>
          <Logo.Title>Nonofficial NEAR printer for testnet</Logo.Title>
        </Logo.Container>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
  background-color: #222222;
  border-bottom: 1px solid #444;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  width: 100%;
`;

const Logo = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  Title: styled.a.attrs({
    title: "Nonofficial NEAR printer",
    href: "/",
  })`
    display: block;
    font-size: 16px;
    color: white;
  `,
};
