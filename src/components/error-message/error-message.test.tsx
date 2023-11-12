import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { ErrorMessage } from '.';

describe('Error Message', () => {
  test('should contain an image', () => {
    render(<ErrorMessage />);
    const errorImage = screen.getByAltText('error');
    expect(errorImage).toBeInTheDocument();
  });
});
