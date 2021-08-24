import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchTerm from '../../../../models/searchTerm';
import Dropdown from './Dropdown';
import searchIcon from './searchIcon.svg';

const INPUT_PLACEHOLDER = '검색어를 입력해주세요';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 220px;
  height: 100%;
  padding: 0 0 5px 4px;
  background: #fff;
  border: none;
  outline: none;
  border-bottom: 1px solid #333;
  font-size: 14px;
  z-index: 0;

  ::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: #fff;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

type Props = {
  searchTerm: string;
  searchTermList: SearchTerm[];
  onChangeSearchTermInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSearchTermList: () => void;
  onDeleteAllSearchTerm: () => void;
  onDeleteSearchTerm: (content: string) => React.MouseEventHandler;
};

const SearchBar = (props: Props): JSX.Element => {
  const {
    searchTerm,
    searchTermList,
    onChangeSearchTermList,
    onDeleteAllSearchTerm,
    onChangeSearchTermInput,
    onDeleteSearchTerm,
  } = props;

  const [isOpenDropBox, setDropboxOpen] = useState(false);

  const handleOpenDropdown = () => {
    setDropboxOpen(true);
  };

  const handleCloseDropdown = () => {
    setDropboxOpen(false);
  };

  const handleCloseDropdownToDocument = useCallback((event: Event) => {
    const target = event.target as HTMLElement;

    if (target.closest('.search-bar')) {
      return;
    }

    setDropboxOpen(false);
  }, []);

  const handlePressEnterChangeSearchTermList = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    onChangeSearchTermList();
  };

  useEffect(() => {
    document.addEventListener('click', handleCloseDropdownToDocument);
    return () => document.removeEventListener('click', handleCloseDropdownToDocument);
  }, [handleCloseDropdownToDocument]);

  return (
    <Container className="search-bar">
      <SearchInput
        type="text"
        placeholder={INPUT_PLACEHOLDER}
        value={searchTerm}
        onChange={onChangeSearchTermInput}
        onKeyPress={handlePressEnterChangeSearchTermList}
        onFocus={handleOpenDropdown}
      />
      <SearchButton type="button" onClick={onChangeSearchTermList}>
        <img src={searchIcon} />
      </SearchButton>
      {isOpenDropBox && (
        <Dropdown
          onCloseDropdown={handleCloseDropdown}
          onDeleteAllSearchTerm={onDeleteAllSearchTerm}
          onDeleteSearchTerm={onDeleteSearchTerm}
          searchTermList={searchTermList}
        />
      )}
    </Container>
  );
};

export default SearchBar;
