import React from 'react';
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

const ImageList = styled.ul`
  flex: 1;
  margin-left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.grey3};
  font-size: ${(props) => props.theme.fontSize.tiny};
  border: 1px solid ${(props) => props.theme.color.grey2};
  border-radius: 5px;
`;

type Props = {
  addImageButtonText: string;
  imageThumbnailSize: number;
  imageListPlaceholderText: string;
  images: string[];
};
const ReviewPostImages = (props: Props): JSX.Element => {
  const { addImageButtonText, imageThumbnailSize, imageListPlaceholderText, images } = props;

  return (
    <Container>
      <InputFileLabel size={imageThumbnailSize}>
        {addImageButtonText}
        <InputFile type="file" multiple={true} />
      </InputFileLabel>
      <ImageList>{images.length === 0 ? imageListPlaceholderText : null}</ImageList>
    </Container>
  );
};

export default ReviewPostImages;
