import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import searchIcon from './searchIcon.svg';

const INPUT_PLACEHOLDER = '검색어를 입력해주세요';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 220px;
  height: 20px;
  padding: 0 0 5px 3px;
  background: #fff;
  border: none;
  outline: none;
  border-bottom: 1px solid #333;
  font-size: 14px;

  :placeholder {
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

const SearchBar = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    [setSearchTerm]
  );

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder={INPUT_PLACEHOLDER}
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <SearchButton type="button">
        <img src={searchIcon} />
      </SearchButton>
    </Wrapper>
  );
};

export default SearchBar;
