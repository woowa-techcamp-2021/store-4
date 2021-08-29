import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { SortButton } from '../../containers/ProductListContainer';
import optionStore from '../../stores/optionStore';
import { ProductListOrder } from '../../types/product';

const Container = styled.div``;

type ButtonProps = {
  isSelected: boolean;
};

const Button = styled.button<ButtonProps>`
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 700;
  margin: 0px 24px;
  background-color: ${(props) => props.theme.color.white1};
  color: ${(props) => (props.isSelected ? props.theme.color.mint2 : props.theme.color.black)};
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

type Props = {
  buttons: SortButton[];
  onClickSortButton: (option: ProductListOrder) => () => void;
};

const SortButtonList = (props: Props): JSX.Element => {
  const { buttons, onClickSortButton } = props;
  const option = optionStore.option;

  const SortButtons = buttons.map((button) => (
    <Button
      key={button.key}
      onClick={onClickSortButton(button.key)}
      isSelected={option.sort === button.key}
    >
      {button.body}
    </Button>
  ));

  return <Container>{SortButtons}</Container>;
};

export default observer(SortButtonList);
