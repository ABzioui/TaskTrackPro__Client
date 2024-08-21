import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuthenticatedRoute from '../AuthenticatedRoute';

const MockComponent = () => <div>Authenticated Content</div>;

test('renders child component when authenticated', () => {
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/protected"
          element={<AuthenticatedRoute isAuthenticated={true}>
            <MockComponent />
          </AuthenticatedRoute>}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Authenticated Content')).toBeInTheDocument();
});

test('redirects to home when not authenticated', () => {
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/protected"
          element={<AuthenticatedRoute isAuthenticated={false}>
            <MockComponent />
          </AuthenticatedRoute>}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
});
