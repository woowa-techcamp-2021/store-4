import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import SearchTerm from '../../../../../models/searchTerm';
import { RiCloseFill } from 'react-icons/ri';

const FlexCenterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled(FlexCenterWrapper)`
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
  color: ${(props) => props.theme.color.grey3};
  margin-right: 8px;
  cursor: default;
`;

const DeleteButton = styled.div`
  color: ${(props) => props.theme.color.grey5};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

type Props = {
  index: number;
  searchTerm: SearchTerm;
  onDeleteSearchTerm: React.MouseEventHandler;
  onSearchTermClick: React.MouseEventHandler;
  onCloseDropdown: () => void;
};

const SearchTermItem = (props: Props): JSX.Element => {
  const { searchTerm, index, onDeleteSearchTerm, onSearchTermClick, onCloseDropdown } = props;

  const handleOnSearchTermClick: MouseEventHandler = (e) => {
    onSearchTermClick(e);
    onCloseDropdown();
  };

  return (
    <Container>
      <SearchTermItemLeft
        data-testid={`search-term-item-content-${index}`}
        onClick={handleOnSearchTermClick}
      >
        {searchTerm.content}
      </SearchTermItemLeft>
      <SearchTermItemRight>
        <Date data-testid={`search-term-item-date-${index}`}>{searchTerm.date}</Date>
        <DeleteButton
          onClick={onDeleteSearchTerm}
          data-testid={`search-term-item-delete-btn-${index}`}
        >
          <RiCloseFill />
        </DeleteButton>
      </SearchTermItemRight>
    </Container>
  );
};

export default SearchTermItem;
