import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/Header/HeaderMain/SearchBar/SearchBar';
import { useHistory } from '../lib/router';
import SearchTerm from '../models/searchTerm';
import optionStore from '../stores/optionStore';
import buildQueryString from '../utils/build-query-string';
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

const descDate = (a: SearchTerm, b: SearchTerm) => b.createdAt.getTime() - a.createdAt.getTime();

const SearchBarContainer = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermList, setSearchTermList] = useState(getSearchTermList);
  const option = optionStore.option;
  const history = useHistory();

  const handleChangeSearchTermInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    [setSearchTerm]
  );

  useEffect(() => {
    localStorage.setItem(SEARCH_TERM_LIST_KEY, JSON.stringify(searchTermList));
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
        newSearchTermList.sort(descDate);

        return newSearchTermList;
      });
    } else {
      setSearchTermList((prev) => {
        const newSearchTerm = new SearchTerm({
          content: searchTerm,
          createdAt: new Date(),
        });

        return [newSearchTerm, ...prev];
      });
    }

    setSearchTerm('');

    const query = buildQueryString({
      ...option,
      searchTerm,
      category: '',
    });

    history.push(`/products${query}`);
    optionStore.setSearchTerm(searchTerm);
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
