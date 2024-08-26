import { STORAGE_KEYS } from '@/consts';
import { StorageService } from '@/lib/StorageService';
import { CartProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface CartState {
  items: CartProduct[];
  totalPrice: number;
  totalDiscount: number;
  finalPrice: number;
  count: number;
  countToOrder: number;
  itemsToOrder: CartProduct[];
}
const storageService = new StorageService<CartState>(STORAGE_KEYS.cart.type, STORAGE_KEYS.cart.key, import.meta.env.VITE_STORAGE_SECRET_KEY);

const loadCartFromLocalStorage = (): CartState => {
  const savedCart = storageService.getItems();
  if (savedCart) return savedCart;

  return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0, count: 0, countToOrder: 0, itemsToOrder: [] };
};

const updateTotals = (state: CartState) => {
  state.totalPrice = state.items.reduce((acc, item) => {
    if (item.selected) return (acc += item.price * item.quantity);
    return acc;
  }, 0);
  state.totalDiscount = state.items.reduce((acc, item) => {
    if (item.selected) {
      const discountAmount = item.discount ?? 0;
      return acc + discountAmount * item.quantity;
    }
    return acc;
  }, 0);
  state.finalPrice = state.totalPrice - state.totalDiscount;
  state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
  state.countToOrder = state.items.reduce((acc, item) => {
    if (item.selected) return (acc += item.quantity);
    return acc;
  }, 0);
  state.itemsToOrder = state.items.filter((el) => el.selected === true);
  storageService.setItems(state);
};
const initialState: CartState = loadCartFromLocalStorage();
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const item = action.payload;
      state.items.push(item);

      updateTotals(state);
      storageService.setItems(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      updateTotals(state);
      storageService.setItems(state);
    },
    removeAllFromCart: (state) => {
      state.items = [];
      updateTotals(state);
      storageService.clearItems();
    },
    updateProduct: (
      state,
      action: PayloadAction<Pick<CartProduct, 'id'> & Partial<Pick<CartProduct, 'quantity' | 'selected'>>>,
    ) => {
      const { id, ...rest } = action.payload;
      const productIndex = state.items.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        const body = Object.fromEntries(Object.entries(rest).filter((value) => value !== undefined));
        if (body?.quantity === 0) state.items = state.items.filter((item) => item.id !== action.payload.id);
        else
          state.items[productIndex] = {
            ...state.items[productIndex],
            ...body,
          };
        updateTotals(state);
        storageService.setItems(state);
      }
    },
    clearOrderedData: (state, action: PayloadAction<number[]>) => {
      state.items = state.items.filter((el) => !action.payload.includes(el.id));
      updateTotals(state);
    },
  },
});

export const selectIsInCart = (state: RootState, productId: number) => {
  return state.cart.items.some((item) => item.id === productId);
};
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.count;
export const { addToCart, removeFromCart, removeAllFromCart, updateProduct, clearOrderedData } = cartSlice.actions;

export default cartSlice.reducer;
