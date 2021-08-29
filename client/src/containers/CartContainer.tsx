import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Cart from '../components/Cart/Cart';
import { useHistory } from '../lib/router';
import toast from '../lib/toast';
import cartStore from '../stores/cartStore';
import orderStore from '../stores/orderStore';

const CartContainer = (): JSX.Element => {
  const history = useHistory();

  useEffect(() => {
    cartStore.setCartItemSelectionAll(true);
  }, []);

  const handleClickAllProductOrderButton = () => {
    cartStore.setCartItemSelectionAll(true);

    orderStore.replaceListToCartItemList = cartStore.selectedCartItemList;
    history.push('/order');

    return;
  };

  const handleClickSelectedProductOrderButton = () => {
    if (cartStore.isNothingSelectedCartItems) {
      toast.error('선택된 아이템이 없습니다');
      return;
    }

    orderStore.replaceListToCartItemList = cartStore.selectedCartItemList;
    history.push('/order');

    return;
  };

  return (
    <Cart
      onClickAllProductOrderButton={handleClickAllProductOrderButton}
      onClickSelectedProductOrderButton={handleClickSelectedProductOrderButton}
    />
  );
};

export default observer(CartContainer);
