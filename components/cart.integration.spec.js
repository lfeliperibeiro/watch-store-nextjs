import { makeServer } from '../miragejs/server';
import { renderHook, act } from '@testing-library/react-hooks';
import { useCartStore } from '../store/cart';
import { render, screen } from '@testing-library/react';
import Cart from './cart';

describe('Cart', () => {
  let server;
  let result;
  let add;
  let toggle;
  let reset;

  beforeEach(() => {
    server = makeServer({environment: 'test'})
    result = renderHook(() => useCartStore()).result
    add = result.current.actions.add
    reset = result.current.actions.reset
    toggle = result.current.actions.toggle
    // spy = jest.spyOn(result.current.actions, 'toogle', )
  })

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks()
  })

  it('should add css class "hidden" in  the component', () => {
    render(<Cart/>)

    expect(screen.getByTestId('cart')).toHaveClass('hidden')
  });

  it('should not css class "hidden" when using toggle one time', () => {
    act(() => {
      toggle()
    })

    render(<Cart/>)

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden')
  });
})
