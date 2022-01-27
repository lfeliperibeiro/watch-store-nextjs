import create from 'zustand'
import produce from 'immer';
import product from '../../miragejs/factories/product';

const initialState = {
  open: false,
  products: []
}

export const useCartStore = create(set => {
  const setState = (fn) => set(produce(fn))

  return {
    state: {
      ...initialState
    },
    actions: {
      toggle(){
       setState(({state}) => {
         state.open = !state.open
       })

      },
      add(product){
        setState(({state}) => {
          const doesntExists = !state.products.find(({ id }) => id === product.id)
          if(doesntExists) {
            state.products.push(product)
            state.open = true
          }
        })
      },
      remove(product) {
        setState(({ state }) => {
          const exists = !!state.products.find(({ id }) => id === product.id)

          if (exists) {
            state.products = state.products.filter(({ id }) => {
              return id !== product.id

            })
          }
        });
      },
      removeAll() {
        setState(({state}) => {
          state.products = []
        })
      },
      reset() {
        setState((store) => {
          store.state = initialState
        })
      },
    },
  }
})