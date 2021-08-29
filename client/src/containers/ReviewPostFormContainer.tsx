import React, { ChangeEvent, FormEvent, useState } from 'react';
import ReviewPostForm from '../components/Review/ReviewPost/ReviewPostModal/ReviewPostForm/ReviewPostForm';
import userStore from '../stores/userStore';
import productDetailStore from '../stores/productDetailStore';
import { isNone } from '../utils/typeGuard';
import reviewStore from '../stores/reviewStore';
import toast from '../lib/toast';
import { useHistory } from '../lib/router';

const DEFAULT_PRODUCT_NAME = '이 상품';

const validateFileInputs = (files: FileList): boolean => {
  if (Array.from(files).every((file) => file.type.startsWith('image'))) {
    return true;
  }

  return false;
};

const readAsDataURLAsync = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();

    fileReader.onload = () => res(fileReader.result as string);
    fileReader.onerror = () => rej(fileReader);

    fileReader.readAsDataURL(file);
  });
};

const getThumbnails = (files: FileList): Promise<string[]> => {
  return Promise.all(Array.from(files).map((file) => readAsDataURLAsync(file)));
};

type Props = {
  onClose: () => void;
};
const ReviewPostFormContainer = (props: Props): JSX.Element => {
  const { onClose } = props;
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const history = useHistory();
  const currentProduct = productDetailStore.product;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) return;

    if (validateFileInputs(files) === false) {
      toast.info('이미지 파일만 추가할 수 있습니다');

      event.target.value = '';
      return;
    }

    getThumbnails(files).then((data) => setThumbnails(data));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isNone(userStore.user) || isNone(currentProduct)) {
      return;
    }

    formData.append('userId', userStore.user.id + '');
    formData.append('productId', currentProduct.id + '');

    reviewStore
      .postReview(formData)
      .then(() => {
        toast.success('리뷰가 작성되었습니다');
        productDetailStore.fetchProduct(currentProduct.id);
        return;
      })
      .catch((error) => {
        switch (error.status) {
          case 401:
            toast.error('해당 상품 구매내역이 없습니다');
            return;
          case 404:
            toast.error('삭제된 상품입니다');
            return;
          case 413:
            toast.error('리뷰 작성에 실패했습니다. 이미지 용량을 줄여보세요.');
            return;
          default:
            toast.error('오류가 발생했습니다');
            history.push('/error');
            return;
        }
      })
      .finally(() => onClose());
  };

  return (
    <ReviewPostForm
      productName={currentProduct?.name || DEFAULT_PRODUCT_NAME}
      onCancelButtonClick={onClose}
      onImageUpload={handleImageUpload}
      onSubmit={handleSubmit}
      thumbnails={thumbnails}
    />
  );
};

export default ReviewPostFormContainer;
