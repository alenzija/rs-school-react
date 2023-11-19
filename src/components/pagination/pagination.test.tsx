import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { App } from '../app';
import { dataWithPlanets } from '../../tests/mocks';

describe('Pagination ', () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(dataWithPlanets));
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  const routes = [
    {
      path: '/',
      element: <App />,
    },
  ];
  const router = createMemoryRouter(routes, { initialEntries: ['/?page=1'] });

  test('should update URL query parameter when page changes', async () => {
    act(() => {
      render(<RouterProvider router={router} />);
    });

    let btnNext: HTMLButtonElement;
    let btnPrev: HTMLButtonElement;
    await waitFor(() => {
      btnNext = screen.getByRole('to-next-page');
      btnPrev = screen.getByRole('to-prev-page');
    });

    act(() => {
      fireEvent.click(btnNext);
    });
    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=2');
    });

    act(() => {
      fireEvent.click(btnNext);
    });
    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=3');
    });

    act(() => {
      fireEvent.click(btnPrev);
    });
    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=2');
    });
  });
});
