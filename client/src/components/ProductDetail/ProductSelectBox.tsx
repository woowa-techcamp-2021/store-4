import React from 'react';
import styled from 'styled-components';
import ProductOption from '../../models/product-option';

const Container = styled.div``;

const Select = styled.select`
  width: 200px;
  border: 1px solid ${(props) => props.theme.color.grey3};
  padding: 3px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.small};
  cursor: pointer;
`;

const Option = styled.option``;

type Props = {
  productOptions: ProductOption[];
};

const ProductSelectBox = (props: Props): JSX.Element => {
  const { productOptions } = props;

  const options = productOptions.map(({ id, name, additionalPrice }) => (
    <Option
      key={id}
      data-testid="product-select-product-option"
    >{`${name} (+${additionalPrice})`}</Option>
  ));

  return (
    <Container>
      <Select>{options}</Select>
    </Container>
  );
};

export default ProductSelectBox;
