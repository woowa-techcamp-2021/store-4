import { observer } from 'mobx-react';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/Header/HeaderMain/SearchBar/SearchBar';
import useOption from '../hooks/useOption';
import SearchTerm from '../models/searchTerm';
import { isNone, isNotNone } from '../utils/typeGuard';

const SEARCH_TERM_LIST_KEY = 'search-term-list';

export const isSearchTermArr = (value: SearchTerm[] | unknown): value is SearchTerm[] => {
  if (Array.isArray(value)) {
    return value.every((value) => isNotNone(value.content) && isNotNone(value.createdAt));
  }

  return false;
};

const getSearchTermList = (): SearchTerm[] => {
  const searchTermList = localStorage.getItem(SEARCH_TERM_LIST_KEY);

  if (isNone(searchTermList)) {
    return [];
  }
  try {
    const parsedSearchTermList = JSON.parse(searchTermList);

    if (parsedSearchTermList instanceof Array) {
      if (isSearchTermArr(parsedSearchTermList)) {
        return parsedSearchTermList.map((searchTermObj) => new SearchTerm(searchTermObj));
      }
    }

    return [];
  } catch (error) {
    localStorage.removeItem(SEARCH_TERM_LIST_KEY);
    return [];
  }
};

const SearchBarContainer = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermList, setSearchTermList] = useState(getSearchTermList);
  const { changeSearchTerm } = useOption();

  const handleChangeSearchTermInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    [setSearchTerm]
  );

  useEffect(() => {
    localStorage.setItem(SEARCH_TERM_LIST_KEY, JSON.stringify(searchTermList));
  }, [searchTermList]);

  const handleSearch = (inputSearchTerm: string) => {
    const sameSearchTermIndex = searchTermList.findIndex(
      (term) => term.content === inputSearchTerm
    );

    if (sameSearchTermIndex !== -1) {
      setSearchTermList((prev) => [
        ...prev.slice(0, sameSearchTermIndex),
        ...prev.slice(sameSearchTermIndex + 1),
      ]);
    }

    setSearchTermList((prev) => [
      new SearchTerm({
        content: inputSearchTerm,
        createdAt: new Date(),
      }),
      ...prev,
    ]);

    setSearchTerm('');

    changeSearchTerm(inputSearchTerm);
  };

  const handleChangeSearchTermList = () => {
    handleSearch(searchTerm);
  };

  const handleGetSearchTermItemClickHandler =
    (searchTerm: string): MouseEventHandler =>
    () => {
      handleSearch(searchTerm);
    };

  const handleDeleteAllSearchTerm = () => {
    setSearchTermList([]);
  };

  const getOnDeleteSearchTerm = (content: string) => () => {
    const nextSearchTermList = searchTermList.filter((searchTerm) => {
      return searchTerm.content !== content;
    });

    setSearchTermList(nextSearchTermList);
  };

  return (
    <SearchBar
      getSearchTermItemClickHandler={handleGetSearchTermItemClickHandler}
      searchTermList={searchTermList}
      searchTerm={searchTerm}
      onChangeSearchTermInput={handleChangeSearchTermInput}
      onChangeSearchTermList={handleChangeSearchTermList}
      onDeleteAllSearchTerm={handleDeleteAllSearchTerm}
      getOnDeleteSearchTerm={getOnDeleteSearchTerm}
    />
  );
};

export default observer(SearchBarContainer);
