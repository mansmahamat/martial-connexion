import React from 'react';
import SectionHomepage from '.';
import { render, screen } from '@testing-library/react';

describe('Success state <SectionHomepage />', () => {
  it('should render the container successfully', () => {
    const { container } = render(<SectionHomepage />);
    expect(container).toBeTruthy();
  });
});

describe('Success state <ManualBankAccount />', () => {
  it('should render the title with the expected text', () => {
    render(<SectionHomepage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Stay on top of customer support'
    );
  });
});

describe('Success state <ManualBankAccount />', () => {
  it('should render the first img', () => {
    render(<SectionHomepage />);
    expect(
      screen.getByRole('img', {
        name: /Section homepage/i
      })
    ).toHaveAttribute('src', '/sectionHomepage.png');
  });
});

describe('Success state <ManualBankAccount />', () => {
  it('should render the seond img', () => {
    render(<SectionHomepage />);
    expect(
      screen.getByRole('img', {
        name: /Second section/i
      })
    ).toHaveAttribute('src', '/sectionHomepage2.png');
  });
});

// describe("Render  <SectionHomepage />", () => {
//   it("should render the button with the expected text", () => {
//     const { getByTestId } = renderWithProvider(<SectionHomepage />)
//     expect(getByTestId("button")).toHaveTextContent("Registrera uttag")
//   })
// })

// describe("Render <SectionHomepage />", () => {
//   it("Should render a href to /account", () => {
//     const { getByTestId } = renderWithProvider(<SectionHomepage />)
//     expect(getByTestId("link").closest("a")).toHaveAttribute("href", "/account")
//   })
// })
