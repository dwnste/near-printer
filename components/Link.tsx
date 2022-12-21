import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props extends PropsWithChildren {
  href?: string;
  title?: string;
  className?: string;
}

const Link: React.FC<Props> = ({ children, href, title, className }) => {
  return (
    <Container className={className} title={title} href={href}>
      {children}
    </Container>
  );
};

const Container = styled.a.attrs({
  target: "_blank",
})`
  font-family: sans-serif;
  font-size: 18px;
  color: hsla(0, 0%, 100%, 0.7);

  &:hover {
    color: hsla(0, 0%, 100%, 0.9);
  }

  &:active {
    color: hsla(0, 0%, 100%, 1);
  }

  @media only screen and (max-width: 600px) {
    margin-top: 10px;
    border: 1px solid hsla(0,0%,100%,0.1);
    border-radius: 10px;
    padding: 16px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
`;

export default Link;
