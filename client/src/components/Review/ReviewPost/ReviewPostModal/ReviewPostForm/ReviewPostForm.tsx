import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import ReviewPostStars from './ReviewPostStars/ReviewPostStars';
import ReviewPostText from './ReviewPostText/ReviewPostText';
import ReviewPostImages from './ReviewPostImages/ReviewPostImages';
import ReviewPostButtonGroup from './ReviewPostButtonGroup/ReviewPostButtonGroup';
import Product from '../../../../../models/product';

const STARS_WIDTH = 300;
const DEFAULT_TEXT_FOR_POINT: { [key: number]: string } = {
  1: '매우 별로였어요',
  2: '별로였어요',
  3: '그냥 그랬어요',
  4: '좋았어요',
  5: '최고에요',
};
const ADD_IMAGE_BUTTON_TEXT = '사진 추가';
const IMAGE_THUMBNAIL_SIZE = 90;
const IMAGE_LIST_PLACEHOLDER_TEXT = '사진을 추가하려면 왼쪽 버튼을 클릭하세요';
const CANCEL_BUTTON_TEXT = '취소';
const SUBMIT_BUTTON_TEXT = '후기 남기기';

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const ReviewPostStarsContainer = styled.div``;

const PointsInput = styled.input`
  display: none;
`;

type Props = {
  product: Product;
  onCancelButtonClick: MouseEventHandler;
  onImageUpload: ChangeEventHandler;
  onSubmit: FormEventHandler;
  thumbnails: string[];
};
const ReviewPostForm = (props: Props): JSX.Element => {
  const { product, onCancelButtonClick, onImageUpload, onSubmit, thumbnails } = props;
  const [point, setPoint] = useState(0);
  const [inputText, setInputText] = useState('');
  const handleStarClick = useCallback((point: number) => {
    setPoint(point);
    setInputText(DEFAULT_TEXT_FOR_POINT[point]);
  }, []);
  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setInputText(event.target.value),
    []
  );

  return (
    <Container onSubmit={onSubmit}>
      <ReviewPostStarsContainer>
        <ReviewPostStars width={STARS_WIDTH} onStarClick={handleStarClick} />
        <PointsInput name="point" value={point} readOnly />
      </ReviewPostStarsContainer>
      <ReviewPostText productName={product.name} value={inputText} onChange={handleTextChange} />
      <ReviewPostImages
        addImageButtonText={ADD_IMAGE_BUTTON_TEXT}
        imageThumbnailSize={IMAGE_THUMBNAIL_SIZE}
        imageListPlaceholderText={IMAGE_LIST_PLACEHOLDER_TEXT}
        onImageUpload={onImageUpload}
        images={thumbnails}
      />
      <ReviewPostButtonGroup
        cancelButtonText={CANCEL_BUTTON_TEXT}
        submitButtonText={SUBMIT_BUTTON_TEXT}
        onCancelButtonClick={onCancelButtonClick}
        isSubmitDisabled={point === 0}
      />
    </Container>
  );
};

export default ReviewPostForm;
