import { CarouselImage, Payment, StorageKeyConfig } from './types';

export const FREE_DELIVERY_PRICE = 100;

export const DEFAULT_DELIVERY_PRICE = 7;

export const DEFAULT_LIFTING_PRICE = 2;

export const DEFAULT_CITY = { Description: 'Київ', Ref: '8d5a980d-391c-11dd-90d9-001a92567626', CityID: '4' } as const;

export const STORAGE_KEYS: Record<'city' | 'cart' | 'order', StorageKeyConfig> = {
  city: {
    type: 'local',
    key: 'city',
  },
  cart: {
    type: 'local',
    key: 'cart',
  },
  order: {
    type: 'local',
    key: 'order',
  },
} as const;

export const CATALOGUE_OFFER_IMAGES: CarouselImage[] = [
  {
    src: '/w_320.avif',
    alt: 'Alt',
    link: '/',
  },
  {
    src: '/w_320-1.avif',
    alt: 'Alt 1',
    link: '/',
  },
  {
    src: '/w_320-2.avif',
    alt: 'Alt 2',
    link: '/',
  },
  {
    src: '/w_320-3.avif',
    alt: 'Alt 3',
    link: '/',
  },
  {
    src: '/w_320-4.avif',
    alt: 'Alt 4',
    link: '/',
  },
] as const;

export const PAYMENT_METHODS: {
  value: Payment;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: 'cash',
    label: 'Payment upon receipt',
    description: '',
    icon: './cash.svg',
  },
  {
    value: 'credit',
    label: 'Payment in installments or credit',
    description: 'Up to 18 payments',
    icon: './credit.svg',
  },
  {
    value: 'online',
    label: 'Payment by card online',
    description: 'Visa / MasterCard ',
    icon: './card.svg',
  },
] as const;
