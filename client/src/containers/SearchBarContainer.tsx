import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/Header/HeaderMain/SearchBar/SearchBar';
import SearchTerm from '../models/searchTerm';
import { isNotNone, isNone } from '../utils/typeGuard';

export const isSearchTermArr = (value: SearchTerm[] | unknown): value is SearchTerm[] => {
  if (Array.isArray(value)) {
    return value.every((value) => isNotNone(value.content) && isNotNone(value.createdAt));
  }

  return false;
};

const getSearchTermList = (): SearchTerm[] => {
  const searchTermList = localStorage.getItem('search-term-list');

  if (isNone(searchTermList)) {
    return [];
  }

  const parsedSearchTermList = JSON.parse(searchTermList);

  if (parsedSearchTermList instanceof Array) {
    if (isSearchTermArr(parsedSearchTermList)) {
      return parsedSearchTermList.map((searchTermObj) => new SearchTerm(searchTermObj));
    }
  }

  return [];
};

const SearchBarContainer = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermList, setSearchTermList] = useState(getSearchTermList);

  const handleChangeSearchTermInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    [setSearchTerm]
  );

  useEffect(() => {
    localStorage.setItem('search-term-list', JSON.stringify(searchTermList));
  }, [searchTermList]);

  const handleChangeSearchTermList = () => {
    const findedSearchTermIndex = searchTermList.findIndex((term) => term.content === searchTerm);

    if (findedSearchTermIndex >= 0) {
      const cloneSearchTerm = {
        ...searchTermList[findedSearchTermIndex],
        createdAt: new Date(),
      };

      setSearchTermList((prev) => {
        const newSearchTermList = [...prev];
        newSearchTermList[findedSearchTermIndex] = cloneSearchTerm;
        return newSearchTermList;
      });

      return;
    }

    setSearchTermList((prev) => {
      const newSearchTerm = {
        content: searchTerm,
        createdAt: new Date(),
      };

      return [newSearchTerm, ...prev];
    });
  };

  const handleDeleteAllSearchTerm = () => {
    setSearchTermList([]);
  };

  return (
    <SearchBar
      searchTermList={searchTermList}
      searchTerm={searchTerm}
      onChangeSearchTermInput={handleChangeSearchTermInput}
      onChangeSearchTermList={handleChangeSearchTermList}
      onDeleteAllSearchTerm={handleDeleteAllSearchTerm}
    />
  );
};

export default SearchBarContainer;
