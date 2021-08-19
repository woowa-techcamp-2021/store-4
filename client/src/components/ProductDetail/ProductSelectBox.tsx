import React from 'react';
import styled from 'styled-components';
import ProductSelect from '../../models/product-select';

const Container = styled.div``;

const Select = styled.select`
  width: 250px;
  border: 1px solid ${(props) => props.theme.color.grey3};
  padding: 3px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.small};
  cursor: pointer;
`;

const Option = styled.option``;

type Props = {
  productSelect: ProductSelect;
};

const ProductSelectBox = (props: Props): JSX.Element => {
  const { name, productOptions } = props.productSelect;

  const options = productOptions.map(({ id, name, additionalPrice }) => (
    <Option
      key={id}
      data-testid="product-select-product-option"
    >{`${name} (+${additionalPrice})`}</Option>
  ));

  return (
    <Container>
      <Select>
        {options}
        <Option selected disabled>{`${name}옵션을 선택해주세요`}</Option>
      </Select>
    </Container>
  );
};

export default ProductSelectBox;
