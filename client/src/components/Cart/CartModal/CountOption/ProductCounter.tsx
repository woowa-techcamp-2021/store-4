import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CountInput = styled.input.attrs({
  type: 'text',
})`
  border: 1px solid ${(props) => props.theme.color.grey2};
  border-right: none;
  width: 45px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.small};
  outline: none;
`;

const ControlButton = styled.button`
  width: 30px;
  height: 16px;
  background-color: ${(props) => props.theme.color.white2};
  border: 1px solid ${(props) => props.theme.color.grey2};
  border-bottom: none;
  color: ${(props) => props.theme.color.grey4};
  cursor: pointer;

  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.color.grey2};
  }
`;

const ControlButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  count: number;
  onIncreaseClick: MouseEventHandler;
  onDecreaseClick: MouseEventHandler;
  onCountChange: ChangeEventHandler;
};

const ProductCounter = (props: Props): JSX.Element => {
  const { count, onIncreaseClick, onDecreaseClick, onCountChange } = props;

  return (
    <Container>
      <CountInput value={count} onChange={onCountChange} />
      <ControlButtonWrapper>
        <ControlButton
          onClick={onIncreaseClick}
          data-testid="product-counter-increase"
          aria-label="Count up"
        >
          <RiArrowUpSLine />
        </ControlButton>
        <ControlButton
          onClick={onDecreaseClick}
          data-testid="product-counter-decrease"
          aria-label="Count down"
        >
          <RiArrowDownSLine />
        </ControlButton>
      </ControlButtonWrapper>
    </Container>
  );
};

export default ProductCounter;
