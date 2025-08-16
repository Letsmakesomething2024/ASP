import { render, screen } from '@testing-library/react';
import App from './App';

test('renders pickleball tracker heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Pickleball Tracker/i);
  expect(headingElement).toBeInTheDocument();
});
