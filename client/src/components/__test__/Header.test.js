import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      alt: '#f5f5f5'
    },
    secondary: {
      main: '#fff',
      100: '#fff',
      200: '#ccc',
      light: '#bbb'
    }
  }
});

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

test('renders Header with TaskTrack', () => {
  renderWithTheme(<Header />);

  expect(screen.getByText(/TaskTrack Pro/i)).toBeInTheDocument();
});

test('applies the correct styles', () => {
  const { container } = renderWithTheme(<Header />);

  const headerElement = container.firstChild;
  expect(headerElement).toHaveStyle(`width: 100%`);
  expect(headerElement).toHaveStyle(`display: flex`);
  expect(headerElement).toHaveStyle(`justify-content: center`);
  expect(headerElement).toHaveStyle(`align-items: center`);

  const innerBox = screen.getByTestId('inner-box');
  expect(innerBox).toHaveStyle(`text-align: center`);

  const typographyElement = screen.getByTestId('header-title');
  expect(typographyElement).toHaveStyle(`font-weight: 700`);
  expect(typographyElement).toHaveStyle(`color: ${theme.palette.secondary.main}`);
  expect(typographyElement).toHaveStyle(`margin-top: 20px`);
});
