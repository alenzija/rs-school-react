import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { PlanetsList } from '.';

import { dataWithPlanets, dataWithoutPlanets } from '../../tests/mocks';

jest.mock('next/router', () => require('next-router-mock'));

describe('Planets List', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display an appropriate message if no cards are present:', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(dataWithoutPlanets));
    act(() => {
      render(
        <PlanetsList
          planets={dataWithoutPlanets.planets}
          listLoading={false}
          onChangePanelLoading={() => {}}
        />
      );
    });
    await waitFor(() => {
      const element = screen.getByText(/no planets/i);
      const cards = screen.queryByText(/name/i);
      expect(element).toBeInTheDocument();
      expect(cards).toBeNull();
    });
  });

  test('should renders the specified number of cards:', async () => {
    act(() => {
      render(
        <PlanetsList
          planets={dataWithPlanets.planets}
          listLoading={false}
          onChangePanelLoading={() => {}}
        />
      );
    });
    await waitFor(() => {
      const planetList = screen.getByRole('planets-list');
      const cards = screen.getAllByRole('card');
      expect(planetList).toBeInTheDocument();
      expect(cards.length).toBe(10);
    });
  });
});
