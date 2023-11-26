import '@testing-library/jest-dom';
import { test, jest, expect, describe, afterEach } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import mockRouter from 'next-router-mock';

import Home from '../../pages';

import { dataWithPlanets, testPlanet } from '../../tests/mocks';

jest.mock('../../services/swapi-service');

jest.mock('next/router', () => require('next-router-mock'));

describe('Planet card', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should open a detailed card component after clicking on the card', async () => {
    act(() => {
      render(<Home planetsData={dataWithPlanets} planet={null} />);
    });
    await waitFor(async () => {
      const cards = screen.getAllByRole('card');
      const leftPanel = screen.queryByRole('detailed-component');
      expect(leftPanel).toBeNull();
      fireEvent.click(cards[0]);
    });
    expect(mockRouter.query.name).toBe(dataWithPlanets.planets[0].name);
  });

  test('should render the relevant card data', () => {
    render(<Home planetsData={dataWithPlanets} planet={testPlanet} />);
    const namePlanet = screen.getByText('testName');
    expect(namePlanet).toBeInTheDocument();
  });
});
