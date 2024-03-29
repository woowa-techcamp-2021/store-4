import React, { useEffect, useState } from 'react';
import { ReviewWithProduct } from '../models/review';
import AccountReview from '../components/Account/AccountReview/AccountReview';
import reviewStore from '../stores/reviewStore';
import userStore from '../stores/userStore';
import { useHistory } from '../lib/router';
import toast from '../lib/toast';
import confirmModal from '../lib/confirmModal';
import { observer } from 'mobx-react';

const AccountReviewContainer = (): JSX.Element => {
  const userId = userStore.user?.id;
  const [reviews, setReviews] = useState<ReviewWithProduct[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (userId === undefined) {
      return;
    }

    reviewStore.getReviewsByUser(userId).then(({ reviews }) => {
      setReviews(reviews.map((review) => new ReviewWithProduct(review)));
    });
  }, [userId]);

  const handleDeleteReviewClick = (deleteReviews: ReviewWithProduct[]) => {
    const reviewsLength = deleteReviews.length;

    if (reviewsLength === 0) {
      toast.info('삭제할 후기를 선택하세요');
      return;
    }

    const deleteReviewsFn = () =>
      reviewStore
        .deleteReview(deleteReviews.map((review) => review.id))
        .then(() => {
          toast.success(`${reviewsLength}개의 후기가 삭제되었습니다`);

          const nextReviews = reviews.filter((review) => !deleteReviews.includes(review));
          setReviews(nextReviews);
        })
        .catch((error) => {
          switch (error.status) {
            case 403:
              toast.error('해당 후기에 대한 권한이 없습니다');
              history.push('/account');
              return;
            case 404:
              toast.error('이미 삭제된 후기입니다');
              history.push('/account/reviews');
              return;
            default:
              toast.error('오류가 발생했습니다');
              return;
          }
        });

    confirmModal.show(
      '정말 삭제하시겠어요?',
      `${reviewsLength}개의 상품 후기가 삭제됩니다.`,
      deleteReviewsFn
    );
  };

  return <AccountReview reviews={reviews} onDeleteButtonClick={handleDeleteReviewClick} />;
};

export default observer(AccountReviewContainer);
