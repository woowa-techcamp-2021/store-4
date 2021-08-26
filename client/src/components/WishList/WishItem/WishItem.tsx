import React from 'react';
import styled from 'styled-components';
import { Wish } from '../../../types/Wish';
import { toKoreanMoneyFormat } from '../../../utils/moneyFormater';
import { isNotNone } from '../../../utils/typeGuard';

const TextTinyBold = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
`;

const AlignCenterContainer = styled(TextTinyBold)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 92px;
  &:not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.color.grey3};
  }
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 10px;
`;

const CheckBoxWrapper = styled(AlignCenterContainer)`
  width: 78px;
`;

const CheckBox = styled.input``;

const ItemImg = styled.img`
  width: 52px;
  height: 52px;
  padding-right: 10px;
`;

const ItemWrapper = styled.div``;

const ItemTitle = styled(TextTinyBold)``;

const Option = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 400;
  color: ${(props) => props.theme.color.grey3};

  padding-right: 8px;
`;

const PriceCount = styled.div`
  width: 144px;
  display: flex;
  justify-content: center;
`;

const Price = styled(TextTinyBold)``;
const Count = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.grey4};
  padding-left: 3px;
`;

type Props = {
  wishItem: Wish;
  setCheckBox: (id: number, checked: boolean) => void;
};

const WishItem = (props: Props): JSX.Element => {
  const { wishItem, setCheckBox } = props;
  const { id, title, imgSrc, defaultPrice, count, checked, options } = wishItem;

  let totalPrice = defaultPrice;
  if (isNotNone(options)) {
    totalPrice += options.reduce((total, current) => total + current.price, 0);
  }
  totalPrice *= count;

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox(id, e.target.checked);
  };

  const Options = options?.map((option) => (
    <Option key={option.type + option.name}>
      {option.type} : {option.name} (+{toKoreanMoneyFormat(option.price)})
    </Option>
  ));

  return (
    <Container>
      <CheckBoxWrapper>
        <CheckBox type="checkbox" checked={checked} onChange={onChangeCheckBox} />
      </CheckBoxWrapper>
      <ItemTitleWrapper>
        <ItemImg src={imgSrc} />
        <ItemWrapper>
          <ItemTitle data-testid="item-title">{title}</ItemTitle>
          {Options}
        </ItemWrapper>
      </ItemTitleWrapper>
      <PriceCount>
        <Price>{toKoreanMoneyFormat(totalPrice)}</Price>
        <Count>/ {count}개</Count>
      </PriceCount>
    </Container>
  );
};

export default WishItem;
