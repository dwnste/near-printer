import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    background-color: #141414;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
