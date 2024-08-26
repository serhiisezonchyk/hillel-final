import { StorageService } from '@/lib/StorageService';
import { cartProductSchema, deliverySchema, orderSchema, paymentEnum, productSchema } from '@/validation';
import { z } from 'zod';

export type Product = z.infer<typeof productSchema>;

export type CartProduct = z.infer<typeof cartProductSchema>;

export type Category = string;

export type Filter = {
  price: [number, number];
  name: string;
  category: string[];
};

export type CarouselImage = {
  src: string;
  alt: string;
  link?: string;
};

export interface StorageKeyConfig {
  type: keyof typeof StorageService.storageTypes;
  key: string;
}

export type RedirectedCart = {
  totalPrice: number;
  totalDiscount: number;
  finalPrice: number;
  uniqueCount: number;
  countToOrder: number;
  itemsToOrder: CartProduct[];
};
export type DeliveryMethod = z.infer<typeof deliverySchema>;
export type Order = z.infer<typeof orderSchema>;
export type Payment = z.infer<typeof paymentEnum>;

// NOVA POST API TYPES (REQ)
export type CalledMethod = 'getCities' | 'getWarehouses';

export interface NovaPostReqBodyBase {
  apiKey: string;
  modelName: 'AddressGeneral';
  calledMethod: CalledMethod;
}

export interface NovaPostMethodProperties {
  FindByString?: string;
  Page?: number;
  Limit?: number;
}

export interface GetCitiesProperties extends NovaPostMethodProperties {}
export interface GetWarehousesProperties extends NovaPostMethodProperties {
  CityRef: string;
}

export interface NovaPostReqBodyGetCities extends NovaPostReqBodyBase {
  calledMethod: 'getCities';
  methodProperties: GetCitiesProperties;
}

export interface NovaPostReqBodyGetWarehouses extends NovaPostReqBodyBase {
  calledMethod: 'getWarehouses';
  methodProperties: GetWarehousesProperties;
}

export type NovaPostReqBody = NovaPostReqBodyGetCities | NovaPostReqBodyGetWarehouses;

// NOVA POST API TYPES (RES)

export interface WarhousesNP {
  Description: string;
  Ref: string;
}
export interface CitiesNP {
  Description: string;
  Ref: string;
  CityID: string;
}
export interface NovaPostResBase {
  success: boolean;
  info: {
    totalCount: number;
  };
  data: unknown;
}

export interface GetCitiesResponse extends NovaPostResBase {
  data: CitiesNP[];
}

export interface GetWarehousesResponse extends NovaPostResBase {
  data: WarhousesNP[];
}
