import React from 'react';
import styled from 'styled-components';

import cartStore from '../../../../stores/cartStore';
import { SelectWithSelected } from '../../../../types/product';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';
import { getOptionList, getSelectedOptionPriceList } from '../../helper';

const AlignCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResetButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 82px;
  &:not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.color.grey3};
  }
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

const CheckBoxWrapper = styled(AlignCenterContainer)`
  width: 38px;
`;

const CheckBox = styled.input``;

const ItemImg = styled.img`
  width: 52px;
  height: 52px;
  padding-right: 10px;
`;

const ItemWrapper = styled.div``;

const ItemTitle = styled.div``;

const OptionList = styled.div`
  padding-top: 4px;
`;

const Option = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 400;
  color: ${(props) => props.theme.color.grey3};

  padding-right: 8px;
`;

const CountWrapper = styled(AlignCenterContainer)`
  flex-direction: column;
  width: 120px;
`;

const Count = styled.div`
  padding-bottom: 7px;
`;

const OptionChangeButton = styled(ResetButton)`
  width: 90px;
  height: 23px;
  border: 1px solid ${(props) => props.theme.color.grey2};
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 400;
`;

const PriceWrapper = styled(AlignCenterContainer)`
  width: 120px;
`;

const Price = styled(AlignCenterContainer)``;

type Props = {
  onOptionClick: (id: number) => void;
  id: number;
  title: string;
  imgSrc: string;
  count: number;
  productPrice: number;
  isSelected: boolean;
  selectWithSelecteds: SelectWithSelected[] | undefined;
};

const CartItem = (props: Props): JSX.Element => {
  const { onOptionClick, id, title, imgSrc, count, productPrice, isSelected, selectWithSelecteds } =
    props;
  const optionList = selectWithSelecteds ? getOptionList(selectWithSelecteds) : [];
  const optionPriceList = selectWithSelecteds
    ? getSelectedOptionPriceList(selectWithSelecteds)
    : [];

  const productTotalPrice =
    (productPrice + optionPriceList.reduce((total, current) => total + current, 0)) * count;

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    cartStore.setCartItemSelection(id, e.target.checked);
  };

  return (
    <Container>
      <CheckBoxWrapper>
        <CheckBox type="checkbox" onChange={onChangeCheckBox} checked={isSelected} />
      </CheckBoxWrapper>
      <ItemTitleWrapper>
        <ItemImg src={imgSrc} />
        <ItemWrapper>
          <ItemTitle>{title}</ItemTitle>
          <OptionList>
            {selectWithSelecteds &&
              optionList.map((option) => (
                <Option key={option.name}>
                  {option.type} : {option.name} {`(+${toKoreanMoneyFormat(option.price)})`}
                </Option>
              ))}
          </OptionList>
        </ItemWrapper>
      </ItemTitleWrapper>
      <CountWrapper>
        <Count>{count}개</Count>
        <OptionChangeButton
          onClick={() => {
            onOptionClick(id);
          }}
        >
          옵션/수량
        </OptionChangeButton>
      </CountWrapper>
      <PriceWrapper>
        <Price>{toKoreanMoneyFormat(productTotalPrice)}</Price>
      </PriceWrapper>
    </Container>
  );
};

export default CartItem;
