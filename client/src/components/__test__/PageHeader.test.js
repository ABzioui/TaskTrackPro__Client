import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageHeader from '../PageHeader.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fff',
      100: '#fff',
      300: '#ccc'
    }
  }
});

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

test('renders PageHeader with title and subtitle', () => {
  const title = 'Test Title';
  const subtitle = 'Test Subtitle';

  renderWithTheme(<PageHeader title={title} subtitle={subtitle} />);

  const titleElement = screen.getByText(title);
  const subtitleElement = screen.getByText(subtitle);

  expect(titleElement).toBeInTheDocument();
  expect(subtitleElement).toBeInTheDocument();
});

test('applies the correct styles', () => {
  const title = 'Styled Title';
  const subtitle = 'Styled Subtitle';

  renderWithTheme(<PageHeader title={title} subtitle={subtitle} />);

  const titleElement = screen.getByText(title);
  const subtitleElement = screen.getByText(subtitle);

  expect(titleElement).toHaveStyle(`color: ${theme.palette.secondary[100]}`);
  expect(subtitleElement).toHaveStyle(`color: ${theme.palette.secondary[300]}`);
});

// test('renders without title and subtitle', () => {
//   const title = 'Test Title';
//   const subtitle = '';

//   renderWithTheme(<PageHeader title={title} subtitle={subtitle} />);

//   const titleElement = screen.getByText(title);
//   const subtitleElement = screen.getByText(subtitle);

//   expect(titleElement).toBeInTheDocument();
//   expect(subtitleElement).toBeInTheDocument();
// });


test('handles non-string values gracefully', () => {
  renderWithTheme(<PageHeader title={123} subtitle={456} />);

  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.getByText('456')).toBeInTheDocument();
});
