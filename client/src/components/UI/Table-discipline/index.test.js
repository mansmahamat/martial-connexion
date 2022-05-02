import React from 'react';
import TableDiscipline from '.';
import { render, screen } from '@testing-library/react';

const prices = [
  {
    discipline: 'Boxe anglaise',
    price: '200'
  },
  {
    discipline: 'Lutte',
    price: '345544'
  }
];

describe('Success state <TableDiscipline />', () => {
  it('should render the container successfully', () => {
    const { container } = render(<TableDiscipline prices={prices} />);
    expect(container).toBeTruthy();
  });
});
