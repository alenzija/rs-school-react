import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { SearchForm } from './index';

describe('Search Form', () => {
  let button: HTMLButtonElement;
  let input: HTMLInputElement;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    act(() => {
      render(<RouterProvider router={router} />);
    });
    button = screen.getByRole('button');
    input = screen.getByRole<HTMLInputElement>('search-input');
  });

  const routes = [
    {
      path: '/',
      element: <SearchForm />,
    },
  ];

  const router = createMemoryRouter(routes);
  test('should contain input and button', () => {
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should retrieve the value from the local storage upon mounting', async () => {
    const testSearchValue = localStorage.getItem('searchPhrase') || '';

    const inputElement = screen.getByPlaceholderText<HTMLInputElement>(
      'Enter a planet name'
    );
    expect(inputElement.value).toBe(testSearchValue);
  });

  test('should save the entered value to the local storage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const testInputValue = 'test';

    input.value = testInputValue;
    fireEvent.click(button);

    expect(setItemSpy.mock.calls).toHaveLength(1);
    expect(setItemSpy.mock.calls[0][0]).toBe('searchPhrase');
    expect(setItemSpy.mock.calls[0][1]).toBe(testInputValue);
  });
});
