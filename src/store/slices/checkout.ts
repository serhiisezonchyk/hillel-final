import { STORAGE_KEYS } from '@/consts';
import { StorageService } from '@/lib/StorageService';
import { calculateDeliveryPrice } from '@/lib/utils';
import { CitiesNP, DeliveryMethod, Order, Payment } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { RedirectedCart } from './../../types/index';

const defaultItems: RedirectedCart = {
  totalPrice: 0,
  totalDiscount: 0,
  finalPrice: 0,
  uniqueCount: 0,
  countToOrder: 0,
  itemsToOrder: [],
};
export enum CheckoutSteps {
  REVIEW_ORDER = 'REVIEW_ORDER',
  USER_INFO = 'USER_INFO',
  DELIVERY_METHOD = 'DELIVERY_METHOD',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
}
export enum CheckoutStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  READY_TO_ORDER = 'readyToOrder',
}

interface CheckoutState {
  step: CheckoutSteps;
  city: Pick<Order, 'city'>['city'];
  userInfo: Pick<Order, 'user'>['user'];
  delivery: DeliveryMethod;
  paymentMethod: Payment;
  items: RedirectedCart;
  status: CheckoutStatus;
  deliveryCost: {
    deliveryPrice: number;
    liftingPrice: number;
  };

  priceWithShipping: number;
}

const storageService = new StorageService<RedirectedCart>(STORAGE_KEYS.order.type, STORAGE_KEYS.order.key);

const initialState: CheckoutState = {
  step: CheckoutSteps.REVIEW_ORDER,
  city: { name: '', ref: '' },
  userInfo: { name: '', phone: '', email: '' },
  delivery: { deliveryMethod: 'pickup' },
  paymentMethod: 'cash',
  items: defaultItems,
  status: CheckoutStatus.LOADING,
  deliveryCost: {
    deliveryPrice: 0,
    liftingPrice: 0,
  },
  priceWithShipping: 0,
};
const updatePrices = (state: CheckoutState) => {
  const deliveryCost = calculateDeliveryPrice(state.items.finalPrice, state.delivery);
  state.deliveryCost = deliveryCost;
  state.priceWithShipping = state.items.finalPrice + deliveryCost.deliveryPrice + deliveryCost.liftingPrice;
};
export const checkoutSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    nextStep: (state) => {
      switch (state.step) {
        case CheckoutSteps.REVIEW_ORDER:
          state.step = CheckoutSteps.USER_INFO;
          break;
        case CheckoutSteps.USER_INFO:
          state.step = CheckoutSteps.DELIVERY_METHOD;
          break;
        case CheckoutSteps.DELIVERY_METHOD:
          state.step = CheckoutSteps.PAYMENT_METHOD;
          break;
        default:
          break;
      }
    },
    editStep: (state, action: PayloadAction<CheckoutSteps>) => {
      state.step = action.payload;
    },
    loadData: (state) => {
      const cityStorageService = new StorageService<CitiesNP>(STORAGE_KEYS.city.type, STORAGE_KEYS.city.key);
      const city = cityStorageService.getItems() as CitiesNP;
      const data = storageService.getItems();
      state.status = CheckoutStatus.LOADING;
      state.city = { name: city.Description, ref: city.Ref };
      state.items = data ?? defaultItems;
      updatePrices(state);
      state.status = CheckoutStatus.LOADED;
    },
    clearCheckoutStateData: (state) => {
      state = initialState;
      storageService.clearItems();
    },
    setCity: (state, action: PayloadAction<Pick<CheckoutState, 'city'>['city']>) => {
      state.city = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<Pick<CheckoutState, 'userInfo'>['userInfo']>) => {
      state.userInfo = action.payload;
    },
    setDeliveryInfo: (state, action: PayloadAction<Pick<CheckoutState, 'delivery'>['delivery']>) => {
      state.delivery = action.payload;
      updatePrices(state);
    },
    setPaymentMehod: (state, action: PayloadAction<Payment>) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { nextStep, editStep, loadData, setCity, setUserInfo, setDeliveryInfo, setPaymentMehod,clearCheckoutStateData } =
  checkoutSlice.actions;
export const selectStep = (state: RootState) => state.checkout.step;
export const selectItems = (state: RootState) => state.checkout.items;
export const selectStatus = (state: RootState) => state.checkout.status;
export const selectCity = (state: RootState) => state.checkout.city;
export const selectUserInfo = (state: RootState) => state.checkout.userInfo;
export const selectDelivery = (state: RootState) => state.checkout.delivery;
export const selectPaymentMethod = (state: RootState) => state.checkout.paymentMethod;
export const selectPrices = (state: RootState) => {
  return {
    totalPrice: state.checkout.items.totalPrice,
    totalDiscount: state.checkout.items.totalDiscount,
    finalPrice: state.checkout.items.finalPrice,
    deliveryCosts: state.checkout.deliveryCost,
    priceWithShipping: state.checkout.priceWithShipping,
  };
};
export default checkoutSlice.reducer;
