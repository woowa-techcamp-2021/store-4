import React from 'react';
import styled from 'styled-components';
import { toKoreanMoneyFormatPure } from '../../../../utils/moneyFormater';

const CountOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background-color: ${(props) => props.theme.color.grey1};
`;
const CountWrapperProductTitle = styled.div`
  flex-grow: 6;
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 600;
`;
const CounterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const CountInput = styled(Input)`
  width: 43px;
  height: 34px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: center;
  border: 1px solid ${(props) => props.theme.color.grey3};
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const CountButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const CountUpButton = styled(Button)`
  width: 23px;
  height: 17px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.grey4};
  background-color: ${(props) => props.theme.color.white1};
  border: 1px solid ${(props) => props.theme.color.grey3};
`;
const CountDownButton = styled(Button)`
  width: 23px;
  height: 17px;
  color: ${(props) => props.theme.color.grey4};
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.color.white1};
  border: 1px solid ${(props) => props.theme.color.grey3};
`;

const ProductTotalPrice = styled.div`
  flex-grow: 1;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const PriceNumber = styled.span`
  font-weight: 600;
`;

const InputCount = (): JSX.Element => {
  return (
    <CountOptionWrapper>
      <CountWrapperProductTitle>업사이클링 명함케이스. 맥주짠</CountWrapperProductTitle>
      <CounterWrapper>
        <CountInput type="number" />
        <CountButtons>
          <CountUpButton>ᐱ</CountUpButton>
          <CountDownButton>ᐯ</CountDownButton>
        </CountButtons>
      </CounterWrapper>
      <ProductTotalPrice>
        <PriceNumber>{toKoreanMoneyFormatPure(16900)}</PriceNumber>원
      </ProductTotalPrice>
    </CountOptionWrapper>
  );
};

export default InputCount;
