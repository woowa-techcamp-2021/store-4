import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CountInput = styled.input.attrs({
  type: 'text',
})`
  border: 1px solid ${(props) => props.theme.color.grey4};
  border-right: none;
  width: 45px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.small};
  outline: none;
`;

const ControlButton = styled.button`
  width: 30px;
  height: 18px;
  background-color: ${(props) => props.theme.color.white2};
  border: 1px solid ${(props) => props.theme.color.grey4};
  border-bottom: none;
  color: ${(props) => props.theme.color.grey4};
  cursor: pointer;

  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.color.grey4};
  }
`;

const ControlButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

const ProductCounter = (props: Props): JSX.Element => {
  const { count, increase, decrease } = props;

  return (
    <Container>
      <CountInput value={count} />
      <ControlButtonWrapper>
        <ControlButton onClick={increase} data-testid="product-counter-increase">
          +
        </ControlButton>
        <ControlButton onClick={decrease} data-testid="product-counter-decrease">
          -
        </ControlButton>
      </ControlButtonWrapper>
    </Container>
  );
};

export default ProductCounter;
