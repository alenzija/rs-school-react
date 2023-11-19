import { ShouldRevalidateFunctionArgs } from 'react-router-dom';
import { shouldRevalidatePlanet } from './routes';
import { AgnosticDataRouteMatch } from '@remix-run/router';

describe('shouldRevalidatePlanet', () => {
  test('should return false if planet names are the same', () => {
    const args = {
      currentParams: { name: 'testName' } as AgnosticDataRouteMatch['params'],
      nextParams: { name: 'testName' } as AgnosticDataRouteMatch['params'],
    } as ShouldRevalidateFunctionArgs;
    expect(shouldRevalidatePlanet(args)).toBeFalsy();
  });

  test('should return true if planet names are different', () => {
    const args = {
      currentParams: { name: 'testName' } as AgnosticDataRouteMatch['params'],
      nextParams: { name: 'testName2' } as AgnosticDataRouteMatch['params'],
    } as ShouldRevalidateFunctionArgs;
    expect(shouldRevalidatePlanet(args)).toBeTruthy();
  });
});
