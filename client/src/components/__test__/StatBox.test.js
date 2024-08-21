import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatBox from '../StatBox.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

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

test('renders StatBox with title, icon, value, increase & description', () => {
  const title = 'Test Title';
  const value = '123';
  const increase = '10%';
  const description = 'Test Description';
  const icon = <Box data-testid="test-icon" />;

  renderWithTheme(<StatBox title={title} value={value} increase={increase} description={description} icon={icon} />);

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(value)).toBeInTheDocument();
  expect(screen.getByText(increase)).toBeInTheDocument();
  expect(screen.getByText(description)).toBeInTheDocument();
  expect(screen.getByTestId('test-icon')).toBeInTheDocument();
});

test('applies the correct styles', () => {
  const title = 'Styled Title';
  const value = '123';
  const increase = '10%';
  const description = 'Styled Description';
  const icon = <Box data-testid="styled-icon" />;

  const { container } = renderWithTheme(<StatBox title={title} value={value} increase={increase} description={description} icon={icon} />);

  const statBox = container.firstChild;
  expect(statBox).toHaveStyle(`background-color: ${theme.palette.background.alt}`);
  expect(statBox).toHaveStyle(`border-radius: 0.55rem`);
});

test('StatBox is visible', () => {
  const title = 'Visible Title';
  const value = '123';
  const increase = '10%';
  const description = 'Visible Description';
  const icon = <Box data-testid="visible-icon" />;

  renderWithTheme(<StatBox title={title} value={value} increase={increase} description={description} icon={icon} />);

  expect(screen.getByText(title)).toBeVisible();
  expect(screen.getByText(value)).toBeVisible();
  expect(screen.getByText(increase)).toBeVisible();
  expect(screen.getByText(description)).toBeVisible();
  expect(screen.getByTestId('visible-icon')).toBeVisible();
});
