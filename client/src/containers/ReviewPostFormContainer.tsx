import React, { ChangeEvent, FormEvent, useState } from 'react';
import ReviewPostForm from '../components/Review/ReviewPost/ReviewPostModal/ReviewPostForm/ReviewPostForm';
import userStore from '../stores/userStore';
import productDetailStore from '../stores/productDetailStore';
import { isNone } from '../utils/typeGuard';
import reviewStore from '../stores/reviewStore';

const DEFAULT_PRODUCT_NAME = '이 상품';

const validateFileInputs = (files: FileList) => {
  if (Array.from(files).some((file) => !file.type.startsWith('image'))) {
    throw new Error('invalid file input');
  }
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
  const currentProduct = productDetailStore.product;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) return;

    validateFileInputs(files);

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
      .postReview(formData, userStore.token)
      .then(() => {
        // reload
      })
      .catch((err) => {
        console.error(err);
        alert('죄송합니다. 리뷰 작성에 실패했습니다. 이미지 파일 용량을 줄여보세요.');
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
