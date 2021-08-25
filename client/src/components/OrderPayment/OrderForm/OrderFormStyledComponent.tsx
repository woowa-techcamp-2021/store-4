import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RowTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
  margin: 16px 0px;
  font-weight: 600;
`;

export const Column = styled.div`
  display: flex;
  height: 55px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 600;
  border-top: 1px solid ${(props) => props.theme.color.grey2};
  :last-child {
    border-bottom: 1px solid ${(props) => props.theme.color.grey2};
  }
`;

export const Label = styled.label`
  width: 120px;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 24px;
  background-color: ${(props) => props.theme.color.grey1};
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0px 16px;
`;

type InputProps = {
  width?: string;
};

export const Input = styled.input<InputProps>`
  width: ${(props) => props.width || '220px'};
  height: 35px;
  padding: 0px 10px;
  border: 1px solid ${(props) => props.theme.color.grey2};
  text-decoration: none;
  outline: none;
`;
