import '@testing-library/jest-dom';
import { test, jest, expect, describe } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { LeftSidePanel } from '.';

jest.mock('../../services/swapi-service');
jest.mock('next/router', () => require('next-router-mock'));

const testPlanet = {
  name: 'testName',
  climate: 'testClimate',
  terrain: 'testTerrain',
  population: 'testPopulation',
  diameter: 'testDiameter',
  orbitalPeriod: 'testOrbitalPeriod',
};

describe('Detailed card', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('display a loading indicator while fetching data', async () => {
    act(() => {
      render(<LeftSidePanel planet={testPlanet} loading={true} />);
    });
    expect(screen.getByRole('spinner')).toBeInTheDocument();
  });

  test('should hide the component after clicking the close button ', async () => {
    act(() => {
      render(<LeftSidePanel planet={testPlanet} loading={false} />);
    });
    await waitFor(() => {
      const closeBtn = screen.getByRole('close-panel');
      expect(closeBtn).toBeInTheDocument();
      fireEvent.click(closeBtn);
    });
    const leftPanel = screen.queryByRole('detailed-panel');
    expect(leftPanel).toBeNull();
  });

  test('should correctly display the detailed card data', () => {
    act(() => {
      render(<LeftSidePanel planet={testPlanet} loading={false} />);
    });
    const name = screen.getByText(testPlanet.name);
    const climate = screen.getByText(testPlanet.climate);
    const terrain = screen.getByText(testPlanet.terrain);
    const population = screen.getByText(testPlanet.population);
    const diameter = screen.getByText(testPlanet.diameter);
    const orbitalPeriod = screen.getByText(testPlanet.orbitalPeriod);
    expect(name).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(orbitalPeriod).toBeInTheDocument();
  });
});
