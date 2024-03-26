import React from "react";
import styled from "styled-components";

export const Footer: React.FC = () => {
  return (
    <Container>
      <Anchor href={process.env.GITHUB_URL}>source code</Anchor>
      {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA && (
        <>
          <Separator />
          <Anchor
            key="githubCommitUrl"
            href={`${process.env.GITHUB_URL}/commit/${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}`}
          >
            commit{" "}
            <Bold>
              {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA.slice(0, 7)}
            </Bold>
          </Anchor>
        </>
      )}
    </Container>
  );
};

const Anchor = styled.a.attrs({
  target: "_blank",
})`
  color: hsla(0, 0%, 100%, 0.5);

  &:hover {
    color: hsla(0, 0%, 100%, 0.7);
  }
`;

const Separator = styled.span.attrs({ children: "|" })`
  margin: 0 8px;
  font-weight: bold;
`;

const Bold = styled.span`
  font-weight: bold;

  &:hover {
    color: hsla(0, 0%, 100%, 0.7);
  }
`;

const Container = styled.div`
  font-size: 10px;
  color: hsla(0, 0%, 100%, 0.5);
  text-align: center;
  padding: 8px;

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
