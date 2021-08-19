import React from 'react';
import styled from 'styled-components';

const StarSvg = styled.svg``;

type StarPathProps = {
  isFilled: boolean;
};
const StarPath = styled.path<StarPathProps>`
  fill: ${(props) => (props.isFilled ? props.theme.color.mint2 : 'none')};
  stroke: ${(props) => (props.isFilled ? props.theme.color.mint2 : props.theme.color.mint1)};
`;

const Star = (props: StarPathProps): JSX.Element => {
  const { isFilled } = props;

  return (
    <StarSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 48">
      <StarPath
        isFilled={isFilled}
        strokeWidth="3"
        strokeLinecap="round"
        d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
      />
    </StarSvg>
  );
};

export const generateStars = (point: number): JSX.Element[] => {
  return Array.from({ length: 5 }).map((_, i) => <Star key={i} isFilled={i < point} />);
};
