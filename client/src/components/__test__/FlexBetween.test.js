import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlexBetween from '../FlexBetween';
import { Box } from '@mui/material';

test('renders FlexBetween with correct styles', () => {
  const { container } = render(
    <FlexBetween>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
    </FlexBetween>
  );

  const flexContainer = container.firstChild;
  expect(flexContainer).toHaveStyle('display: flex');
  expect(flexContainer).toHaveStyle('justify-content: space-between');
  expect(flexContainer).toHaveStyle('align-items: center');
});