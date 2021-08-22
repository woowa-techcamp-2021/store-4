import React, { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import ReviewPostForm from '../components/Review/ReviewPost/ReviewPostModal/ReviewPostForm/ReviewPostForm';

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
  onCancelButtonClick: MouseEventHandler;
};
const ReviewPostFormContainer = (props: Props): JSX.Element => {
  const { onCancelButtonClick } = props;
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) return;

    validateFileInputs(files);

    getThumbnails(files).then((data) => {
      setThumbnails(data);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    const point = +formElement['point'].value;
    const content = formElement['content'].value;
    const reviewImages = formElement['images'].files;

    console.log(point, content, reviewImages);
  };

  return (
    <ReviewPostForm
      onCancelButtonClick={onCancelButtonClick}
      onImageUpload={handleImageUpload}
      onSubmit={handleSubmit}
      thumbnails={thumbnails}
    />
  );
};

export default ReviewPostFormContainer;
