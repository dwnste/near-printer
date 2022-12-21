import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props extends PropsWithChildren {
  onClick?(): void;
  loading?: boolean;
}

const Submit: React.FC<Props> = ({ children, onClick, loading }) => {
  return (
    <Container disabled={loading} onClick={onClick}>
      {children}
    </Container>
  );
};

const Container = styled.button.attrs({
  type: "submit",
})`
  cursor: pointer;
  padding: 16px;
  border-radius: 3px;
  background-color: hsla(0, 0%, 100%, 0.1);
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: bold;

  &:hover,
  &:focus {
    background-color: hsla(0, 0%, 100%, 0.15);
  }

  &:active {
    background-color: hsla(0, 0%, 100%, 0.2);
  }
`;

export default Submit;
