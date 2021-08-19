import { keyframes, css } from 'styled-components';

const fadein = keyframes`
  from{
    opacity:0;
  }

  to{
    opacity:1;
  }
`;

const fadeout = keyframes`
  from{
    opacity:1;
  }
  to{
    opacity:0;
  }
`;

export const show = css`
  animation: 1s ease-in ${fadein};
`;

export const hide = css`
  animation: 1s ease-in ${fadeout};
`;
