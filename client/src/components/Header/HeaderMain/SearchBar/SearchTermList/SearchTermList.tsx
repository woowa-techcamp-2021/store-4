import React from 'react';
import styled from 'styled-components';
import SearchTerm from '../../../../../models/searchTerm';
import SearchTermItem from './SearchTermItem';

const Container = styled.div`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.color.white1};
`;

const EmptyList = styled.div`
  margin: 8px 0px;
`;

type Props = {
  searchTermList: SearchTerm[];
  getOnDeleteSearchTerm: (content: string) => React.MouseEventHandler;
  getSearchTermItemClickHandler: (content: string) => React.MouseEventHandler;
};

const NO_SEARCHTERM_LIST_TITLE = '최근 검색어가 없습니다.';

const SearchTermList = (props: Props): JSX.Element => {
  const { searchTermList, getOnDeleteSearchTerm, getSearchTermItemClickHandler } = props;

  const SearchTermItems = searchTermList.map((searchTerm, index) => (
    <SearchTermItem
      key={index}
      index={index}
      searchTerm={searchTerm}
      onDeleteSearchTerm={getOnDeleteSearchTerm(searchTerm.content)}
      onSearchTermClick={getSearchTermItemClickHandler(searchTerm.content)}
    />
  ));

  return (
    <Container>
      {SearchTermItems.length === 0 ? (
        <EmptyList>{NO_SEARCHTERM_LIST_TITLE}</EmptyList>
      ) : (
        SearchTermItems
      )}
    </Container>
  );
};

export default SearchTermList;
