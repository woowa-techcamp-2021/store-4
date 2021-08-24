import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/Header/HeaderMain/SearchBar/SearchBar';
import SearchTerm from '../models/searchTerm';
import { isNone, isNotNone } from '../utils/typeGuard';

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
    const foundSearchTermIndex = searchTermList.findIndex((term) => term.content === searchTerm);

    if (foundSearchTermIndex >= 0) {
      const changedSearchTerm = new SearchTerm({
        ...searchTermList[foundSearchTermIndex],
        createdAt: new Date(),
      });

      setSearchTermList((prev) => {
        const newSearchTermList = [...prev];
        newSearchTermList[foundSearchTermIndex] = changedSearchTerm;

        return newSearchTermList;
      });

      return;
    }

    setSearchTermList((prev) => {
      const newSearchTerm = new SearchTerm({
        content: searchTerm,
        createdAt: new Date(),
      });

      return [newSearchTerm, ...prev];
    });

    setSearchTerm('');
  };

  const handleDeleteAllSearchTerm = () => {
    setSearchTermList([]);
  };

  const handleDeleteSearchTerm = (content: string) => () => {
    const nextSearchTermList = searchTermList.filter((searchTerm) => {
      return searchTerm.content !== content;
    });

    setSearchTermList(nextSearchTermList);
  };

  return (
    <SearchBar
      searchTermList={searchTermList}
      searchTerm={searchTerm}
      onChangeSearchTermInput={handleChangeSearchTermInput}
      onChangeSearchTermList={handleChangeSearchTermList}
      onDeleteAllSearchTerm={handleDeleteAllSearchTerm}
      onDeleteSearchTerm={handleDeleteSearchTerm}
    />
  );
};

export default SearchBarContainer;
