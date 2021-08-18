import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    font-family: 'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui, BlinkMacSystemFont,
        'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }
`;

export default GlobalStyle;
