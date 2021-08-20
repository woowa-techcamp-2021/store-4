import React from 'react';
import styled from 'styled-components';

const BUTTON_TEXT = '상품후기 글쓰기';

const Button = styled.button`
  border: none;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.white1};
  margin-bottom: 4px;
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const ReviewInputButton = (): JSX.Element => {
  return <Button>{BUTTON_TEXT}</Button>;
};

export default ReviewInputButton;
