import { cn } from '@/lib/utils';
import { DeliveryMethod } from '@/types';
import React from 'react';
interface Props {
  delivery: DeliveryMethod;
  className?: string;
}
const DeliveryMethodPreview: React.FC<Props> = ({ delivery, className }) => {
  if (delivery.deliveryMethod === 'pickup') return <div className={cn(className)}>Pickup</div>;
  if (delivery.deliveryMethod === 'novapost')
    return (
      <div className={cn(className)}>
        <p>Nova Post</p>
        <p>Warehouse: {delivery.deliveryInfo.warehouse.name}</p>
        <p>Name: {delivery.deliveryInfo.name}</p>
        <p>Last name: {delivery.deliveryInfo.lastName}</p>
        <p>
          Patronymic: {delivery.deliveryInfo.patronymic?.trim().length === 0 ? '-' : delivery.deliveryInfo.patronymic}
        </p>
      </div>
    );
};

export default DeliveryMethodPreview;
