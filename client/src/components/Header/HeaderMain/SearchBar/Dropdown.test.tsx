import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import provideTheme2Test from '../../../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import Dropdown from './Dropdown';
import SearchTerm from '../../../../models/searchTerm';

describe('Dropdown 컴포넌트 테스트', () => {
  const NO_SEARCHTERM_TEXT = '최근 검색어가 없습니다.';

  const MOCK_OBJECT_LIST = [
    { content: '우유', createdAt: new Date() },
    { content: '연필', createdAt: new Date('2020-12-27') },
  ];

  const SEARCHTERM_LIST = MOCK_OBJECT_LIST.map((obj) => new SearchTerm(obj));

  const onDeleteSearchTerm = jest.fn();

  const DEFAULT_PROPS = {
    onCloseDropdown: jest.fn(),
    onDeleteAllSearchTerm: jest.fn(),
    getOnDeleteSearchTerm: jest.fn(() => onDeleteSearchTerm),
  };

  const SEARCH_TERM_ITEM_TEST_PREFIX = 'search-term-item';

  const SEARCH_TERM_ITEM_COTENT = SEARCH_TERM_ITEM_TEST_PREFIX + '-content';
  const SEARCH_TERM_ITEM_DATE = SEARCH_TERM_ITEM_TEST_PREFIX + '-date';
  const SEARCH_TERM_ITEM_DELETE_BUTTON = SEARCH_TERM_ITEM_TEST_PREFIX + '-delete-btn';

  const SEARCH_TERM_ALL_DELETE_BUTTON = 'search-term-all-delete-btn';
  const DROPDOWN_CLOSE_BUTTON = 'dropdown-close-btn';

  test(`searchTermList의 길이가 0인 경우, "${NO_SEARCHTERM_TEXT}" 메세지 출력`, () => {
    render(provideTheme2Test(<Dropdown {...DEFAULT_PROPS} searchTermList={[]} />));

    screen.getAllByText(NO_SEARCHTERM_TEXT);
  });

  test('searchTermList이 있는 경우 searchTermList에 있는 원소들을 표시(content, date)', () => {
    render(provideTheme2Test(<Dropdown {...DEFAULT_PROPS} searchTermList={SEARCHTERM_LIST} />));

    SEARCHTERM_LIST.forEach((searchTerm, index) => {
      const content = screen.getByTestId(`${SEARCH_TERM_ITEM_COTENT}-${index}`);
      const date = screen.getByTestId(`${SEARCH_TERM_ITEM_DATE}-${index}`);
      expect(content.textContent).toBe(searchTerm.content);
      expect(date.textContent).toBe(searchTerm.date);
    });
  });

  test('searchTermItem 삭제 버튼을 누르는 경우 onDeleteSearchTerm이 실행된다', () => {
    render(provideTheme2Test(<Dropdown {...DEFAULT_PROPS} searchTermList={SEARCHTERM_LIST} />));

    SEARCHTERM_LIST.forEach((_, index) => {
      const deleteButton = screen.getByTestId(`${SEARCH_TERM_ITEM_DELETE_BUTTON}-${index}`);
      userEvent.click(deleteButton);
    });

    expect(onDeleteSearchTerm).toBeCalled();
  });

  test('Dropdown 전체 삭제 버튼을 누르는 경우 onDeleteAllSearchTerm이 실행된다.', () => {
    render(provideTheme2Test(<Dropdown {...DEFAULT_PROPS} searchTermList={SEARCHTERM_LIST} />));

    const allDeleteButton = screen.getByTestId(SEARCH_TERM_ALL_DELETE_BUTTON);
    userEvent.click(allDeleteButton);

    expect(DEFAULT_PROPS.onDeleteAllSearchTerm).toBeCalled();
  });

  test('DropDown 닫기 버튼을 누르는 경우 onCloseDropdown이 실행된다.', () => {
    render(provideTheme2Test(<Dropdown {...DEFAULT_PROPS} searchTermList={SEARCHTERM_LIST} />));

    const dropdownCloseButton = screen.getByTestId(DROPDOWN_CLOSE_BUTTON);
    userEvent.click(dropdownCloseButton);

    expect(DEFAULT_PROPS.onCloseDropdown).toBeCalled();
  });
});
