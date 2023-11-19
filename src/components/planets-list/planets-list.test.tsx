import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { PlanetsList } from '.';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../../store';
import { planetsApi } from '../../services/swapi-service-redux';

import { dataWithPlanets, dataWithoutPlanets } from '../../tests/mocks';

const setup = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(planetsApi.middleware),
  });
  render(
    <MemoryRouter>
      <Provider store={store}>
        <PlanetsList />
      </Provider>
    </MemoryRouter>
  );
};

describe('Planets List', () => {
  beforeAll(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('should display an appropriate message if no cards are present:', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(dataWithoutPlanets));
    act(() => {
      setup();
    });
    await waitFor(() => {
      const element = screen.getByText(/no planets/i);
      const cards = screen.queryByText(/name/i);
      expect(element).toBeInTheDocument();
      expect(cards).toBeNull();
    });
  });

  test('should renders the specified number of cards:', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(dataWithPlanets));
    act(() => {
      setup();
    });
    await waitFor(() => {
      const planetList = screen.getByRole('planets-list');
      const cards = screen.getAllByRole('card');
      expect(planetList).toBeInTheDocument();
      expect(cards.length).toBe(10);
    });
  });
});
