import { makeServer } from '../miragejs/server';
import { useFetchProducts } from './use-fetch-product';
import { renderHook } from '@testing-library/react-hooks';

describe('useFetchProducts', () => {
  let server;

  beforeEach(() => {
    server = makeServer({environment: 'test'})
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should return a list of 10 products', async () => {
    server.createList('product', 10)

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts())

    await waitForNextUpdate()
    expect(result.current.products).toHaveLength(10)
    expect(result.current.error).toBe(false)
  });
})