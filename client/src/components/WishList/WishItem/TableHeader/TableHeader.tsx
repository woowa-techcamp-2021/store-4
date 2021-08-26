import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Wish } from '../../../../types/Wish';

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
  height: 40px;
  border-top: 1px solid ${(props) => props.theme.color.black};
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
  background-color: ${(props) => props.theme.color.grey1};
`;

const HeaderCheckBox = styled.input`
  width: 78px;
`;
const HeaderTitle = styled(AlignCenterContainer)`
  flex: 1;
`;
const HeaderPriceCount = styled(AlignCenterContainer)`
  width: 144px;
`;

type Props = {
  wishItems: Wish[];
  setCheckBoxAll: (checked: boolean) => void;
};

const TableHeader = (props: Props): JSX.Element => {
  const { wishItems, setCheckBoxAll } = props;

  const checkedAll = wishItems.length > 0 ? wishItems.every((item) => item.checked) : false;

  const onClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxAll(e.target.checked);
  };

  return (
    <Container>
      <HeaderCheckBox
        type="checkbox"
        checked={checkedAll}
        onChange={onClickCheckBox}
      ></HeaderCheckBox>
      <HeaderTitle>상품/옵션 정보</HeaderTitle>
      <HeaderPriceCount>상품금액/수량</HeaderPriceCount>
    </Container>
  );
};

export default observer(TableHeader);
