import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import mockRouter from 'next-router-mock';

import Home from '../../pages';

import { dataWithPlanets, testPlanet } from '../../tests/mocks';

jest.mock('next/router', () => require('next-router-mock'));

describe('Pagination ', () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(dataWithPlanets));
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  test('should update URL query parameter when page changes', async () => {
    act(() => {
      render(<Home planetsData={dataWithPlanets} planet={testPlanet} />);
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
      expect(mockRouter.query.page).toBe(2);
    });

    act(() => {
      fireEvent.click(btnNext);
    });
    await waitFor(() => {
      expect(mockRouter.query.page).toBe(3);
    });

    act(() => {
      fireEvent.click(btnPrev);
    });
    await waitFor(() => {
      expect(mockRouter.query.page).toBe(2);
    });
  });
});
