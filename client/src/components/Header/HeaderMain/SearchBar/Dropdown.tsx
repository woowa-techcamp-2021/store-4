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
  margin: 8px 0px;
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

const EmptyList = styled.div`
  margin: 8px 0px;
`;

type Props = {
  searchTermList: SearchTerm[];
  onCloseDropdown: () => void;
  onDeleteAllSearchTerm: () => void;
  onDeleteSearchTerm: (content: string) => React.MouseEventHandler;
};

const NO_SEARCHTERM_LIST_TITLE = '최근 검색어가 없습니다.';

const Dropdown = (props: Props): JSX.Element => {
  const { searchTermList, onCloseDropdown, onDeleteAllSearchTerm, onDeleteSearchTerm } = props;

  const SearchTermItems = searchTermList.map((searchTerm, index) => (
    <SearchTermItem key={index}>
      <SearchTermItemLeft data-testid={`search-term-item-content-${index}`}>
        {searchTerm.content}
      </SearchTermItemLeft>
      <SearchTermItemRight>
        <Date data-testid={`search-term-item-date-${index}`}>{searchTerm.date}</Date>
        <DeleteButton
          onClick={onDeleteSearchTerm(searchTerm.content)}
          data-testid={`search-term-item-delete-btn-${index}`}
        >
          X
        </DeleteButton>
      </SearchTermItemRight>
    </SearchTermItem>
  ));

  return (
    <Container>
      <DropdownHeader>
        <DropdownTitle>최근 검색어</DropdownTitle>
      </DropdownHeader>
      <DropdownBody>
        {SearchTermItems.length === 0 ? (
          <EmptyList>{NO_SEARCHTERM_LIST_TITLE}</EmptyList>
        ) : (
          SearchTermItems
        )}
      </DropdownBody>
      <DropdownController>
        <DropdownAllDeleteButton
          onClick={onDeleteAllSearchTerm}
          data-testid="search-term-all-delete-btn"
        >
          전체 삭제
        </DropdownAllDeleteButton>
        <DropdownCloseButton onClick={onCloseDropdown} data-testid="dropdown-close-btn">
          닫기
        </DropdownCloseButton>
      </DropdownController>
    </Container>
  );
};

export default Dropdown;
