import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.color.grey1};
  font-size: ${(props) => props.theme.fontSize.tiny};
  position: absolute;
  width: 100%;
  top: 90%;
  z-index: 999;
`;

const DropdownHeader = styled.div`
  font-weight: 800;
  padding: 8px 16px 0px 16px;
`;

const DropdownTitle = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey1};
`;

const DropdownBody = styled.div`
  padding: 8px 16px;
`;

const DropdownController = styled.div`
  display: flex;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.color.grey1};
  color: ${(props) => props.theme.color.grey5};
  justify-content: space-between;
`;

const DropdownAllDeleteButton = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const DropdownCloseButton = styled.div`
  :hover {
    cursor: pointer;
  }
`;

type Props = {
  onClose: () => void;
};

const Dropdown = (props: Props): JSX.Element => {
  const { onClose } = props;

  return (
    <Container>
      <DropdownHeader>
        <DropdownTitle>최근 검색어</DropdownTitle>
      </DropdownHeader>
      <DropdownBody>검색어 리스트</DropdownBody>
      <DropdownController>
        <DropdownAllDeleteButton>전체 삭제</DropdownAllDeleteButton>
        <DropdownCloseButton onClick={onClose}>닫기</DropdownCloseButton>
      </DropdownController>
    </Container>
  );
};

export default Dropdown;
