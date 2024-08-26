import { DEFAULT_DELIVERY_PRICE, DEFAULT_LIFTING_PRICE, FREE_DELIVERY_PRICE } from '@/consts';
import { DeliveryMethod } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const generateInt = (min: number, max: number): number => Math.floor(Math.random() * max + min);

export const calculateDeliveryPrice = (
  price: number,
  delivery: DeliveryMethod,
): { liftingPrice: number; deliveryPrice: number } => {
  switch (delivery.deliveryMethod) {
    case 'pickup':
      return { liftingPrice: 0, deliveryPrice: 0 };
    case 'novapost': {
      return price > FREE_DELIVERY_PRICE
        ? { deliveryPrice: 0.5, liftingPrice: 3 }
        : { deliveryPrice: DEFAULT_DELIVERY_PRICE + price * 0.05, liftingPrice: DEFAULT_LIFTING_PRICE };
    }
    default:
      return { deliveryPrice: DEFAULT_DELIVERY_PRICE + price * 0.05, liftingPrice: DEFAULT_LIFTING_PRICE };
  }
};
