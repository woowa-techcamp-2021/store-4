import React from 'react';
import ReviewPost from '../components/Review/ReviewPost/ReviewPost';
import userStore from '../stores/userStore';
import productDetailStore from '../stores/productDetailStore';
import toastHelper from '../lib/toast';

const ReviewPostContainer = (): JSX.Element => {
  const getAuthorization = () => {
    if (userStore.user === null) {
      toastHelper.info('로그인이 필요합니다', { delay: 2000 });
      return false;
    }

    if (productDetailStore.product === null) {
      return false;
    }

    if (productDetailStore.product.isOrdered === false) {
      toastHelper.info('해당 상품 구매내역이 없습니다', { delay: 2000 });
      return false;
    }

    return true;
  };

  return <ReviewPost getAuthorization={getAuthorization} />;
};

export default ReviewPostContainer;
