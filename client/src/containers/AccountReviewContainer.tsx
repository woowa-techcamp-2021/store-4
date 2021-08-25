import React, { useEffect, useState } from 'react';
import { ReviewWithProduct } from '../models/review';
import AccountReview from '../components/Account/AccountReview/AccountReview';
import reviewStore from '../stores/reviewStore';
import userStore from '../stores/userStore';

const AccountReviewContainer = (): JSX.Element => {
  const userId = userStore.user?.id;
  const [reviews, setReviews] = useState<ReviewWithProduct[]>([]);

  useEffect(() => {
    if (userId === undefined) {
      return;
    }

    fetchReviews(userId).then(({ reviews }) => {
      setReviews(reviews.map((review) => new ReviewWithProduct(review)));
    });

    function fetchReviews(userId: number) {
      return reviewStore.getReviewsByUser(userId);
    }
  }, [userId]);

  const handleDeleteReviewClick = (deleteReviews: ReviewWithProduct[]) => {
    if (deleteReviews.length === 0) {
      alert('삭제할 후기를 선택하세요');
      return;
    }

    if (window.confirm(`${deleteReviews.length}개의 상품 후기를 삭제하시겠습니까?`)) {
      reviewStore
        .deleteReview(deleteReviews.map((review) => review.id))
        .then(() => {
          const nextReviews = reviews.filter((review) => !deleteReviews.includes(review));

          setReviews(nextReviews);
        })
        .catch(() => {
          alert('죄송합니다. 삭제에 실패했습니다');
        });
    }
  };

  return <AccountReview reviews={reviews} onDeleteButtonClick={handleDeleteReviewClick} />;
};

export default AccountReviewContainer;
