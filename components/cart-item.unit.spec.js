import { fireEvent, render, screen } from '@testing-library/react';
import CartItem from './cart-item';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import { useCartStore } from '../store/cart';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false)

const product = {
  title: 'relógio',
  price: '22.00',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
};

const renderCartItem = () => {
  render(<CartItem product={product} />);
};

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderCartItem();

    const image = screen.getByTestId('image');
    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });

  it('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increase quantity by 1 when second button is clicked', async () => {
    renderCartItem();

    const button = screen.getByTestId('increase');

    fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when first button is clicked', async () => {
    renderCartItem();

    const increaseButton = screen.getByTestId('increase');
    const decreaseButton = screen.getByTestId('decrease');

    const quantity = screen.getByTestId('quantity');

    fireEvent.click(increaseButton);
    expect(quantity.textContent).toBe('2');

    fireEvent.click(decreaseButton);
    expect(quantity.textContent).toBe('1');
  });

  it('should not go below zero in the quantity', async () => {
    renderCartItem();

    const decreaseButton = screen.getByTestId('decrease');

    const quantity = screen.getByTestId('quantity');
    expect(quantity.textContent).toBe('1');
    fireEvent.click(decreaseButton);
    fireEvent.click(decreaseButton);

    expect(quantity.textContent).toBe('0');
  });

  it('should call remove() when remove button is clicked', async () => {
    const result = renderHook(() => useCartStore()).result

    const spy = jest.spyOn(result.current.actions, 'remove')

    renderCartItem()

    const button = screen.getByRole('button', { name: /remove/i })

    await userEvent.click(button)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(product)


  });
});
