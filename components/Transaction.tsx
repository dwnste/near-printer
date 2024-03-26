import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props extends PropsWithChildren {
  href?: string;
}

export const Transaction: React.FC<Props> = ({ children, href }) => {
  return <Container href={href}>{children}</Container>;
};

const Container = styled.a.attrs({
  target: "_black",
})`
  text-decoration: underline;
  font-weight: bold;
`;
