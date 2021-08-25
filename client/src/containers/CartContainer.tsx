import React from 'react';
import Cart from '../components/Cart/Cart';

const CartContainer = (): JSX.Element => {
  const handleClickAllProductOrderButton = () => {
    return;
  };

  const handleClickSelectedProductOrderButton = () => {
    return;
  };

  return (
    <Cart
      onClickAllProductOrderButton={handleClickAllProductOrderButton}
      onClickSelectedProductOrderButton={handleClickSelectedProductOrderButton}
    />
  );
};

export default CartContainer;
