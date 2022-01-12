import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('<Input />', () => {
  it('Should render without crashing', () => {
    const { queryByTestId } = render(<App />);

    expect(queryByTestId('input')).toBeTruthy();
  });
});
