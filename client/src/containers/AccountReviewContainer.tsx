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

  return <AccountReview reviews={reviews} />;
};

export default AccountReviewContainer;
