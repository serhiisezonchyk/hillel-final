import { Order } from '@/types';
import { orderSchema } from '.';

export const isOrderValid = (orderData: Order) => {
  try {
    orderSchema.parse(orderData);
    return true;
  } catch (error) {
    return false;
  }
};
