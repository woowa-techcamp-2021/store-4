import { keyframes, css } from 'styled-components';

export const slidedown = keyframes`
  from {
    opacity:0;
    transform: translateY(-20px)
  }

  to {
    opacity:1;
    transform: translateY(0px)
  }
`;

const fadein = keyframes`
  from{
    opacity:0;
  }

  to{
    opacity:1;
  }
`;

export const fadeout = keyframes`
  from{
    opacity:1;
  }
  to{
    opacity:0;
  }
`;

export const show = css`
  opacity: 1;
  animation: 1s ease-in ${fadein};
`;

export const hide = css`
  opacity: 0;
  animation: 1s ease-in ${fadeout};
`;
