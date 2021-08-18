import React from 'react';
import styled from 'styled-components';
import { SortButton } from '../../containers/ProductListContainer';
import { ProductListOrder } from '../../types/product';

const Container = styled.div``;

const Button = styled.button``;

type Props = {
  buttons: SortButton[];
  onClickSortButton: (option: ProductListOrder) => () => void;
};

const SortButtonList = (props: Props): JSX.Element => {
  const { buttons, onClickSortButton } = props;

  const SortButtons = buttons.map((button) => (
    <Button key={button.key} onClick={onClickSortButton(button.key)}>
      {button.body}
    </Button>
  ));

  return <Container>{SortButtons}</Container>;
};

export default SortButtonList;
