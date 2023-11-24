import '@testing-library/jest-dom';
import { test, expect } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import mockRouter from 'next-router-mock';

import { SearchForm } from '.';

jest.mock('next/router', () => require('next-router-mock'));

describe('Search Form', () => {
  let button: HTMLButtonElement;
  let input: HTMLInputElement;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    act(() => {
      render(<SearchForm loading={false} onChangeLoading={() => {}} />);
    });
    button = screen.getByRole('button');
    input = screen.getByRole<HTMLInputElement>('search-input');
  });

  test('should contain input and button', () => {
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should handleChange works', () => {
    const testInputValue = 'test';
    fireEvent.change(input, { target: { value: testInputValue } });

    expect(input.value).toBe(testInputValue);
  });

  test('should change URL after click on the button', async () => {
    await waitFor(async () => {
      input.value = 'test';
      fireEvent.click(button);
    });
    expect(mockRouter.query.search).toBe('test');
  });
});
