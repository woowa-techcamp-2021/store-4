import React from 'react';
import styled from 'styled-components';
import SearchTerm from '../../../../models/searchTerm';
import SearchTermList from './SearchTermList/SearchTermList';

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

const DropdownBody = styled.div``;

const DropdownTitle = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey1};
  background-color: ${(props) => props.theme.color.white1};
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

const Empty = styled.div``;

type Props = {
  searchTermList: SearchTerm[];
  onCloseDropdown: () => void;
  onDeleteAllSearchTerm: () => void;
  getOnDeleteSearchTerm: (content: string) => React.MouseEventHandler;
};

const Dropdown = (props: Props): JSX.Element => {
  const { searchTermList, onCloseDropdown, onDeleteAllSearchTerm, getOnDeleteSearchTerm } = props;

  return (
    <Container>
      <DropdownHeader>
        <DropdownTitle>최근 검색어</DropdownTitle>
      </DropdownHeader>
      <DropdownBody>
        <SearchTermList
          searchTermList={searchTermList}
          getOnDeleteSearchTerm={getOnDeleteSearchTerm}
        />
      </DropdownBody>
      <DropdownController>
        {searchTermList.length === 0 ? (
          <Empty />
        ) : (
          <DropdownAllDeleteButton
            onClick={onDeleteAllSearchTerm}
            data-testid="search-term-all-delete-btn"
          >
            전체 삭제
          </DropdownAllDeleteButton>
        )}

        <DropdownCloseButton onClick={onCloseDropdown} data-testid="dropdown-close-btn">
          닫기
        </DropdownCloseButton>
      </DropdownController>
    </Container>
  );
};

export default Dropdown;
