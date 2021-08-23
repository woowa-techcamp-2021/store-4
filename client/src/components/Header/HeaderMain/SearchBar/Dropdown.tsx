import React from 'react';
import styled from 'styled-components';
import SearchTerm from '../../../../models/searchTerm';

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.color.grey1};
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.color.white1};
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
  background-color: ${(props) => props.theme.color.white1};
`;

const DropdownBody = styled.div`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.color.white1};
`;

const FlexCenterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchTermItem = styled(FlexCenterWrapper)`
  margin-bottom: 4px;
  :last-child {
    margin: 0;
  }
`;

const SearchTermItemLeft = styled(FlexCenterWrapper)`
  justify-content: flex-start;
  :hover {
    cursor: pointer;
  }
`;

const SearchTermItemRight = styled(FlexCenterWrapper)`
  justify-content: flex-end;
`;

const Date = styled.div`
  font-size: 10px;
  color: ${(propss) => propss.theme.color.grey3};
  margin-right: 8px;
  cursor: default;
`;

const DeleteButton = styled.div`
  color: ${(propss) => propss.theme.color.grey5};
  :hover {
    cursor: pointer;
  }
`;

const DropdownController = styled.div`
  display: flex;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.color.grey1};
  color: ${(props) => props.theme.color.grey5};
  justify-content: space-between;
`;

const DropdownButton = styled.div`
  color: ${(props) => props.theme.color.grey5};
  :hover {
    cursor: pointer;
  }
`;

const DropdownAllDeleteButton = styled(DropdownButton)``;
const DropdownCloseButton = styled(DropdownButton)``;

type Props = {
  searchTermList: SearchTerm[];
  onCloseDropdown: () => void;
  onDeleteAllSearchTerm: () => void;
};

const Dropdown = (props: Props): JSX.Element => {
  const { searchTermList, onCloseDropdown, onDeleteAllSearchTerm } = props;

  const SearchTermItems = searchTermList.map((searchTerm, index) => (
    <SearchTermItem key={index}>
      <SearchTermItemLeft>{searchTerm.content}</SearchTermItemLeft>
      <SearchTermItemRight>
        <Date>{searchTerm.date}</Date>
        <DeleteButton>X</DeleteButton>
      </SearchTermItemRight>
    </SearchTermItem>
  ));

  return (
    <Container>
      <DropdownHeader>
        <DropdownTitle>최근 검색어</DropdownTitle>
      </DropdownHeader>
      <DropdownBody>{SearchTermItems}</DropdownBody>
      <DropdownController>
        <DropdownAllDeleteButton onClick={onDeleteAllSearchTerm}>전체 삭제</DropdownAllDeleteButton>
        <DropdownCloseButton onClick={onCloseDropdown}>닫기</DropdownCloseButton>
      </DropdownController>
    </Container>
  );
};

export default Dropdown;
