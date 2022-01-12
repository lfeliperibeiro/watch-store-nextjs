import { fireEvent, render, screen } from '@testing-library/react';
import Search from './search';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('Search', () => {
  it('should render form', () => {
    render(<Search />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should call props doSearch when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);
    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props doSearch with the user input', async () => {
    render(<Search doSearch={doSearch} />);
    const inputText = 'Some text here';
    const form = screen.getByRole('form');
    const input = screen.getByRole('textbox');

    await userEvent.type(input, inputText);

    fireEvent.submit(form);

    expect(doSearch).toHaveBeenLastCalledWith(inputText);
  });
});
