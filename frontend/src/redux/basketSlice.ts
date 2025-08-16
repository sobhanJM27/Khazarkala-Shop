import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setToStorage } from '../utils/localStorage';

export interface BasketState {
  products: { id: string; count: number }[];
}

const initialState: BasketState = {
  products: [],
};

export const basketSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToBasket: (
      state,
      action: PayloadAction<{ id: string; count?: number }>
    ) => {
      const { id, count = 1 } = action.payload;
      const existingProduct = state.products.find((p) => p.id === id);

      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.products.push({ id, count });
      }

      setToStorage('products', JSON.stringify(state.products));
    },
    removeProduct: (
      state,
      action: PayloadAction<{ id: string; count?: number }>
    ) => {
      const { id, count = 1 } = action.payload;
      const existingProduct = state.products.find((p) => p.id === id);

      if (existingProduct) {
        existingProduct.count -= count;
        if (existingProduct.count <= 0) {
          state.products = state.products.filter((p) => p.id !== id);
        }
      }

      setToStorage('products', JSON.stringify(state.products));
    },
    updateProduct: (state, action: PayloadAction<BasketState>) => {
      state.products = action.payload.products;
      setToStorage('products', JSON.stringify(state.products));
    },
  },
});
export const { addToBasket, updateProduct, removeProduct } =
  basketSlice.actions;
export default basketSlice.reducer;
