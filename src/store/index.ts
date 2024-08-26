import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { novapostApi } from './api/novapostApi';
import { productApi } from './api/productApi';
import cartReducer from './slices/cart';
import checkoutReducer from './slices/checkout';
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [novapostApi.reducerPath]: novapostApi.reducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware).concat(novapostApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
