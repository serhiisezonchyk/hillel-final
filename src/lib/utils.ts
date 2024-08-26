import { FREE_DELIVERY_PRICE } from '@/consts';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkFreeDelivery = (price: number) => price > FREE_DELIVERY_PRICE;
export const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const generateInt = (min: number, max: number): number => Math.floor(Math.random() * max + min);
