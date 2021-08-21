import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.theme.device.desktop};
  margin: 40px auto;
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
  margin-right: 20px;
`;

const ImageSkeleton = styled(Skeleton)`
  width: 400px;
  height: 400px;
`;

const ProductInfoWrapper = styled.div`
  width: 600px;
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

const ProductDetailSkeleton = (): JSX.Element => {
  return (
    <Container>
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
    </Container>
  );
};
export default ProductDetailSkeleton;
