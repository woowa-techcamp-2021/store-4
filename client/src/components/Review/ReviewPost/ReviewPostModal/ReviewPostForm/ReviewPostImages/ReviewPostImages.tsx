import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 16px 0;
  padding: 0 24px;
`;

type InputFileLabelProps = {
  size: number;
};
const InputFileLabel = styled.label<InputFileLabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  color: ${(props) => props.theme.color.grey4};
  background-color: ${(props) => props.theme.color.white2};
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 5px;
  cursor: pointer;
`;

const InputFile = styled.input`
  display: none;
`;

const ImageListPlaceholder = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.color.grey3};
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

type ImageListProps = {
  thumbnailSize: number;
};
const ImageList = styled.ul<ImageListProps>`
  flex: 1;
  margin-left: 24px;
  display: flex;
  align-items: center;
  padding: 2px;
  border: 1px solid ${(props) => props.theme.color.grey2};
  border-radius: 5px;
  box-sizing: border-box;
  overflow-x: auto;

  > li {
    min-width: ${(props) => props.thumbnailSize}px;
    width: ${(props) => props.thumbnailSize}px;
    height: 100%;
  }
`;

const ImageListItem = styled.li`
  margin-right: 5px;
`;

const ThumbnailImage = styled.img`
  width: 90px;
  height: 84px;
  object-fit: cover;
  border-radius: 3px;
`;

type Props = {
  addImageButtonText: string;
  imageThumbnailSize: number;
  imageListPlaceholderText: string;
  images: string[];
  onImageUpload: ChangeEventHandler;
};
const ReviewPostImages = (props: Props): JSX.Element => {
  const {
    addImageButtonText,
    imageThumbnailSize,
    imageListPlaceholderText,
    images,
    onImageUpload,
  } = props;

  const ImageListItems = images.map((src, i) => (
    <ImageListItem key={i}>
      <ThumbnailImage src={src}></ThumbnailImage>
    </ImageListItem>
  ));

  return (
    <Container>
      <InputFileLabel size={imageThumbnailSize}>
        {addImageButtonText}
        <InputFile
          name="images"
          type="file"
          multiple={true}
          onChange={onImageUpload}
          accept="image/*"
        />
      </InputFileLabel>
      <ImageList thumbnailSize={imageThumbnailSize}>
        {images.length === 0 ? (
          <ImageListPlaceholder>{imageListPlaceholderText}</ImageListPlaceholder>
        ) : (
          ImageListItems
        )}
      </ImageList>
    </Container>
  );
};

export default ReviewPostImages;
