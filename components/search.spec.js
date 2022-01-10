import { render, screen } from '@testing-library/react';
import Search from './search';

describe('Search', () => {
  it('should render form', () => {
    render(<Search />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
