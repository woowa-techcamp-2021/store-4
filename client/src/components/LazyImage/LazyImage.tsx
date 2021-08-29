import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { show } from '../../styles/animation';
import NoImage from '../../assets/images/no-image.png';
import { isNone } from '../../utils/typeGuard';

type ImgProps = {
  width?: number;
  height?: number;
  aspectRatio?: [number, number];
  objectFit: string;
  borderRadius: number;
};

const isLongerWidth = (aspectRatio?: [number, number], width?: number, height?: number) => {
  if (isNone(aspectRatio)) {
    if (height && width) {
      return width > height;
    }
    return true;
  }

  if (aspectRatio[0] > aspectRatio[1]) {
    return true;
  }

  return false;
};

const setCssSize =
  (str: keyof ImgProps, ratio = 1) =>
  (props: ImgProps) => {
    const value = props[str];
    if (isNone(value) || str === 'objectFit') {
      return '';
    }

    if (Array.isArray(value)) {
      console.log(value);
      return `aspect-ratio: ${value[0]} / ${value[1]};`;
    }
    return `${str}: ${+value * ratio}px;`;
  };

const setBackground = (isLongerWidth: boolean) => {
  if (isLongerWidth) {
    return 'background: linear-gradient(to left, #ededed, #f4f4f4, #ededed);';
  }

  return 'background: linear-gradient(to top, #ededed, #f4f4f4, #ededed);';
};

const Container = styled.div`
  .none {
    display: none;
  }

  .animation-show {
    ${show}
  }
`;

const ImageWrapper = styled.div`
  position: relative;

  :hover {
    .product-wish-wrapper {
      display: inherit;
    }
  }
`;

const Img = styled.img<ImgProps>`
  width: 100%;
  ${setCssSize('width')};
  ${setCssSize('height')};
  ${setCssSize('aspectRatio')};
  object-fit: ${(props) => props.objectFit};
  border-radius: ${(props) => props.borderRadius + 'px'};
`;

const loading = (isLongerWidth: boolean) => keyframes`
  from{
    transform: ${
      isLongerWidth ? `translateX(-200%) scaleX(0.6);` : `translateY(-200%) scaleY(0.6);`
    }
  }

  to{
    transform: ${isLongerWidth ? `translateX(200%) scaleX(0.6);` : `translateY(200%) scaleY(0.6);`}
  }
`;

type ImgSkeleton = ImgProps & {
  isLongerWidth: boolean;
};

const ImgSkeleton = styled.div<ImgSkeleton>`
  position: relative;
  overflow-y: hidden;
  ${setCssSize('width')};
  ${setCssSize('height')};
  ${setCssSize('aspectRatio')}
  border-radius: ${(props) => props.borderRadius + 'px'};
  background-color: ${(props) => props.theme.color.grey1};
  border: none;
  ::after {
    content: ' ';
    ${setCssSize('width')};
    ${setCssSize('height')};
    ${setCssSize('aspectRatio')}
    position: absolute;
    ${(props) => setBackground(props.isLongerWidth)};
    animation: ${(props) => loading(props.isLongerWidth)} 2s infinite ease-out;
  }
`;

const lazy = (img: HTMLImageElement | null) => {
  return new Promise<HTMLImageElement>((res, rej) => {
    if (img) {
      img.onload = () => {
        res(img);
      };
      img.onerror = (err) => {
        rej(err);
      };
      img.src = img.dataset.src as string;
    }
  });
};

type Props = React.PropsWithChildren<{
  src: string | null | undefined;
  width?: number;
  height?: number;
  aspectRatio?: [number, number];
  objectFit?: string;
  testId?: string;
  borderRadius?: number;
  alt?: string;
}>;

const LazyImage = (props: Props): JSX.Element => {
  const {
    src,
    children,
    height,
    width,
    aspectRatio,
    objectFit = 'fill',
    testId,
    alt = '',
    borderRadius = 0,
  } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgSkeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lazy(imgRef.current).then((img) => {
      imgWrapperRef.current?.classList.remove('none');
      imgSkeletonRef.current?.classList.add('none');
      img.classList.remove('hide');
      img.classList.add('animation-show');
    });
  }, []);

  return (
    <Container>
      <ImgSkeleton
        objectFit={objectFit}
        height={height}
        width={width}
        aspectRatio={aspectRatio}
        isLongerWidth={isLongerWidth(aspectRatio, width, height)}
        ref={imgSkeletonRef}
        className="image-skeleton"
        borderRadius={borderRadius}
      />
      <ImageWrapper ref={imgWrapperRef} className="image-wrapper none">
        <Img
          objectFit={objectFit}
          height={height}
          width={width}
          data-testid={testId ?? ''}
          aspectRatio={aspectRatio}
          borderRadius={borderRadius}
          referrerPolicy="no-referrer"
          className="thumbnail hide"
          ref={imgRef}
          data-src={src ?? NoImage}
          alt={alt}
        />
        {children}
      </ImageWrapper>
    </Container>
  );
};

export default LazyImage;
