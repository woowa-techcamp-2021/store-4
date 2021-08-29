import React, { MouseEventHandler } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import LazyImage from '../../LazyImage/LazyImage';

const Container = styled.div``;

const MAGNIFIER_POINTER = {
  WIDTH: 100,
  HEIGHT: 100,
};

const MAGNIFIED_IMAGE_VIEWER = {
  WIDTH: 400,
  HEIGHT: 400,
};

const ImageViewer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;

const MagnifierPointer = styled.div`
  position: absolute;
  width: ${MAGNIFIER_POINTER.WIDTH}px;
  height: ${MAGNIFIER_POINTER.HEIGHT}px;
  background-color: ${(props) => props.theme.color.grey1};
  border: 1px solid ${(props) => props.theme.color.grey4};
  opacity: 0.4;
`;

const MagnifiedViewer = styled.div`
  overflow: hidden;
  background-repeat: no-repeat;
  position: absolute;
  right: ${-MAGNIFIED_IMAGE_VIEWER.WIDTH - 20}px;
  top: 0;
  background-color: ${(props) => props.theme.color.white1};
  width: ${MAGNIFIED_IMAGE_VIEWER.WIDTH}px;
  height: ${MAGNIFIED_IMAGE_VIEWER.HEIGHT}px;
  border-radius: 8px;
`;

const ModifiedImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 1600px;
  object-fit: contain;
`;

type MagnifyWrapperProps = {
  isMagnifierVisible: boolean;
};

const MagnifyWrapper = styled.div<MagnifyWrapperProps>`
  pointer-events: none;
  visibility: ${(props) => (props.isMagnifierVisible ? 'visible' : 'hidden')};
`;

type Props = {
  image: string;
};

type MousePoint = {
  x: number;
  y: number;
};

type GetMousePointArgs = {
  clientX: number;
  clientY: number;
  offsetLeft: number;
  offsetTop: number;
};

const getMousePoint = ({
  clientX,
  clientY,
  offsetTop,
  offsetLeft,
}: GetMousePointArgs): MousePoint => {
  return {
    x: clientX - offsetLeft,
    y: clientY - offsetTop,
  };
};

const getMagnifierPoint = (point: MousePoint) => {
  return {
    x: point.x - MAGNIFIER_POINTER.WIDTH / 2,
    y: point.y - MAGNIFIER_POINTER.HEIGHT / 2,
  };
};

const getNextPoint = (point: MousePoint, width: number, height: number): MousePoint => {
  let nextX = point.x;
  let nextY = point.y;

  const { x, y } = point;
  if (x < 0) {
    nextX = 0;
  } else if (x + MAGNIFIER_POINTER.WIDTH > width) {
    nextX = width - MAGNIFIER_POINTER.WIDTH;
  }

  if (y < 0) {
    nextY = 0;
  } else if (y + MAGNIFIER_POINTER.HEIGHT > height) {
    nextY = height - MAGNIFIER_POINTER.HEIGHT;
  }

  return {
    x: nextX,
    y: nextY,
  };
};

const MagnifierImage = (props: Props): JSX.Element => {
  const { image } = props;
  const [isMagnifierVisible, setMagnifierVisible] = useState(false);
  const magnifier = useRef<HTMLDivElement>(null);
  const magnifiedViewer = useRef<HTMLImageElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const { clientX, clientY, currentTarget } = e;
    const { top, left, height, width } = currentTarget.getBoundingClientRect();

    const currentMousePoint = getMousePoint({
      clientX,
      clientY,
      offsetLeft: left,
      offsetTop: top,
    });

    const magnifierPoint = getMagnifierPoint(currentMousePoint);
    const { x, y } = getNextPoint(magnifierPoint, width, height);

    if (magnifier.current !== null) {
      magnifier.current.style.left = `${x}px`;
      magnifier.current.style.top = `${y}px`;
    }

    if (magnifiedViewer.current !== null) {
      const viewerX = (x * -MAGNIFIED_IMAGE_VIEWER.WIDTH) / MAGNIFIER_POINTER.WIDTH;
      const viewerY = (y * -MAGNIFIED_IMAGE_VIEWER.HEIGHT) / MAGNIFIER_POINTER.WIDTH;

      magnifiedViewer.current.style.transform = `translate(${viewerX}px, ${viewerY}px)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setMagnifierVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagnifierVisible(false);
  }, []);

  return (
    <Container>
      <ImageViewer
        data-testid="image-viewer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <LazyImage
          width={400}
          testId={'selected-image'}
          aspectRatio={[1, 1]}
          src={image}
          objectFit="contain"
          alt="상품 이미지"
        />
        <MagnifyWrapper data-testid="magnifier" isMagnifierVisible={isMagnifierVisible}>
          <MagnifierPointer ref={magnifier} />
          <MagnifiedViewer>
            <ModifiedImage
              alt="상품 이미지"
              ref={magnifiedViewer}
              src={image}
              referrerPolicy="no-referrer"
            />
          </MagnifiedViewer>
        </MagnifyWrapper>
      </ImageViewer>
    </Container>
  );
};
export default MagnifierImage;
