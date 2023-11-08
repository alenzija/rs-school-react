import { test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import SearchForm from './index';

test('Test searchForm', async () => {
  act(() => {
    const routes = [
      {
        path: '/',
        element: <SearchForm />,
      },
    ];

    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
  });

  const testSearchValue = localStorage.getItem('searchPhrase') || '';

  const inputElement = screen.getByPlaceholderText<HTMLInputElement>(
    'Enter a planet name'
  );
  expect(inputElement.value).toBe(testSearchValue);
});
