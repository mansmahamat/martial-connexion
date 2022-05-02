import React from 'react';
import Hero from './Hero';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const user = {
  date: '',
  email: '',
  firstName: '',
  lastName: '',
  avatar: '',
  password: '',
  city: '',
  postalCode: '',
  discipline: '',
  billingID: '',
  _id: ''
};

describe('Success state <Hero />', () => {
  it('should render the container successfully', () => {
    const { container } = render(<Hero User={user} />, { wrapper: BrowserRouter });
    expect(container).toBeTruthy();
  });
});

describe('Success state <ManualBankAccount />', () => {
  it('should render the title with the expected text', () => {
    render(<Hero />, { wrapper: BrowserRouter });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Tous vos clubs de sports de combats'
    );
  });
});

describe('Success state <ManualBankAccount />', () => {
  it('should render the title with the expected text', () => {
    render(<Hero />, { wrapper: BrowserRouter });
    expect(screen.getByText('Voir les clubs').closest('a')).toHaveAttribute('href', '/teams');
  });
});

describe('Success state <ManualBankAccount />', () => {
  it('should render the first img', () => {
    render(<Hero />, { wrapper: BrowserRouter });
    expect(
      screen.getByRole('img', {
        name: /Fighting hero/i
      })
    ).toHaveAttribute(
      'src',
      'https://images.pexels.com/photos/6295987/pexels-photo-6295987.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    );
  });
});

// describe('Success state <ManualBankAccount />', () => {
//   it('should render the seond img', () => {
//     render(<Hero />);
//     expect(
//       screen.getByRole('img', {
//         name: /Second section/i
//       })
//     ).toHaveAttribute('src', '/Banner2.png');
//   });
// });

// describe("Render  <Hero />", () => {
//   it("should render the button with the expected text", () => {
//     const { getByTestId } = renderWithProvider(<Hero />)
//     expect(getByTestId("button")).toHaveTextContent("Registrera uttag")
//   })
// })

// describe("Render <Hero />", () => {
//   it("Should render a href to /account", () => {
//     const { getByTestId } = renderWithProvider(<Hero />)
//     expect(getByTestId("link").closest("a")).toHaveAttribute("href", "/account")
//   })
// })
