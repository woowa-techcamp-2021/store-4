import React, { MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';

const StarSvg = styled.svg`
  :hover {
    cursor: pointer;
  }
`;

type StarPathProps = {
  isFilled: boolean;
  isSettled: boolean;
};
const StarPath = styled.path<StarPathProps>`
  fill: ${(props) => {
    const notFilled = !props.isFilled;
    if (notFilled) {
      return 'none';
    }

    if (props.isSettled) {
      return props.theme.color.mint2;
    } else {
      return props.theme.color.mint1;
    }
  }};
  stroke: ${(props) =>
    props.isFilled && props.isSettled ? props.theme.color.mint2 : props.theme.color.mint1};
`;

interface StarProps extends StarPathProps {
  onClick: MouseEventHandler;
  onMouseEnter: MouseEventHandler;
}
const Star = (props: StarProps): JSX.Element => {
  const { isFilled, isSettled, onClick, onMouseEnter } = props;

  return (
    <StarSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51 48"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <StarPath
        isSettled={isSettled}
        isFilled={isFilled}
        strokeWidth="3"
        strokeLinecap="round"
        d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
      />
    </StarSvg>
  );
};

type ContainerProps = {
  width: number;
};
const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  > * {
    width: ${(props) => props.width / 5 - 5}px;
  }
`;

interface Props extends ContainerProps {
  onStarClick: (point: number) => void;
}
const ReviewPostStars = (props: Props): JSX.Element => {
  const { width, onStarClick } = props;
  const [filledCount, setFilledCount] = useState(0);
  const [isSettled, setIsSettled] = useState(false);

  const getMouseEnterHandler = useCallback(
    (index: number) => () => {
      setIsSettled(false);
      setFilledCount(index + 1);
    },
    []
  );
  const getClickHandler = useCallback(
    (index: number) => () => {
      setIsSettled(true);
      onStarClick(index + 1);
    },
    [onStarClick]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isSettled) {
      setIsSettled(true);
      onStarClick(filledCount);
    }
  }, [filledCount, isSettled, onStarClick]);

  const Stars = Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      onClick={getClickHandler(i)}
      onMouseEnter={getMouseEnterHandler(i)}
      isFilled={i < filledCount}
      isSettled={isSettled}
    />
  ));

  return (
    <Container width={width} onMouseLeave={handleMouseLeave}>
      {Stars}
    </Container>
  );
};

export default ReviewPostStars;
