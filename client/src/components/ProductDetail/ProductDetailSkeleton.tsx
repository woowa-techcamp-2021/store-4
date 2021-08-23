import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.theme.device.desktop};
  margin: 40px auto;
`;

const HeadWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Skeleton = styled.div`
  background-color: ${(props) => props.theme.color.grey1};
  opacity: 0.4;
  border-radius: 8px;
`;

const ImageWrapper = styled.div`
  display: flex;
`;

const ImageSideSkeleton = styled(Skeleton)`
  width: 80px;
  height: 80px;
  margin-right: 40px;
`;

const ImageSkeleton = styled(Skeleton)`
  width: 400px;
  height: 400px;
`;

const ProductInfoWrapper = styled.div`
  width: 550px;
  height: 500px;
`;

const ProductTitleSkeleton = styled(Skeleton)`
  width: 200px;
  height: 40px;
  margin-bottom: 40px;
`;

const InfoRowWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 12px 0;
`;

const InfoRowLabelSkeleton = styled(Skeleton)`
  width: 80px;
  height: 30px;
`;

const InfoRowContentSkeleton = styled(Skeleton)`
  width: 60%;
  height: 30px;
  margin-left: 20px;
`;

const ContentWrapper = styled.div`
  margin: 50px 0;
  padding: 10px;
`;

const ContentTitleSkeleton = styled(Skeleton)`
  width: 200px;
  height: 40px;
`;

const ContentSkeleton = styled(Skeleton)`
  width: 100%;
  height: 200px;
  margin: 40px auto;
`;

const ProductDetailSkeleton = (): JSX.Element => {
  return (
    <Container>
      <HeadWrapper>
        <ImageWrapper>
          <ImageSideSkeleton />
          <ImageSkeleton />
        </ImageWrapper>
        <ProductInfoWrapper>
          <ProductTitleSkeleton />
          <InfoRowWrapper>
            <InfoRowLabelSkeleton />
            <InfoRowContentSkeleton />
          </InfoRowWrapper>

          <InfoRowWrapper>
            <InfoRowLabelSkeleton />
            <InfoRowContentSkeleton />
          </InfoRowWrapper>

          <InfoRowWrapper>
            <InfoRowLabelSkeleton />
            <InfoRowContentSkeleton />
          </InfoRowWrapper>
        </ProductInfoWrapper>
      </HeadWrapper>

      <ContentWrapper>
        <ContentTitleSkeleton />
        <ContentSkeleton />
      </ContentWrapper>
    </Container>
  );
};
export default ProductDetailSkeleton;
