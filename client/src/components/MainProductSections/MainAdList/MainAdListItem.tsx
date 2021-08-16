import React from 'react';
import styled from 'styled-components';

const MainAdListItemContainer = styled.div``;

const ImageWrapper = styled.div``;

const AdImage = styled.img``;

const ItemTitles = styled.div``;

const Title = styled.div``;

const SubTitle = styled.div``;

type MainAddListItemProps = {
  id: number;
  title: string;
  subTitle: string;
  imgSrc: string;
};

const MainAdListItem = (props: MainAddListItemProps): JSX.Element => {
  const { title, subTitle, imgSrc } = props;
  return (
    <MainAdListItemContainer>
      <ImageWrapper>
        <AdImage src={imgSrc} />
      </ImageWrapper>
      <ItemTitles>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </ItemTitles>
    </MainAdListItemContainer>
  );
};

export default MainAdListItem;
