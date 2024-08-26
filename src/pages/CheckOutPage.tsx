import CityAndProductsBlock from '@/components/checkout/CityAndProductsBlock';
import ContactInformationBlock from '@/components/checkout/ContactInformationBlock';
import CreateOrder from '@/components/checkout/CreateOrder';
import DeliveryInformationBlock from '@/components/checkout/DeliveryInformationBlock';
import PaymentMethodBlock from '@/components/checkout/PaymentMethodBlock';
import HelmetMetadata from '@/components/shared/HelmetMetadata';
import { CheckoutStatus, clearCheckoutStateData, loadData, selectItems, selectStatus } from '@/store/slices/checkout';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const CheckOutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
    return()=>{
      dispatch(clearCheckoutStateData())
    }
  }, [dispatch]);

  const status = useSelector(selectStatus);
  const data = useSelector(selectItems);

  if (status === CheckoutStatus.LOADING) {
    return null;
  }

  if (status === CheckoutStatus.LOADED && data.countToOrder === 0) {
    return <Navigate to={'/cart'} />;
  }
  return (
    <div className="bg-muted">
      <HelmetMetadata title="Checkout | Comfy" />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center">
          <div className="flex gap-4 mt-2 mb-6 justify-between">
            <h1 className="text-xl sm:text-2xl text-foreground self-center">
              Order <span className="text-muted-foreground text-xl ml-4">{data.countToOrder} goods</span>
            </h1>
            <Link to="/" className="flex flex-row gap-2 text-primary items-center text-sm sm:text-md">
              <ChevronLeft className="size-4 sm:size-6" /> Back to shopping
            </Link>
          </div>
          <div className="grid gap-9 mb-9 grid-cols-1 lg:grid-cols-[_100fr_58fr]">
            <div className="flex flex-col gap-2">
              {/* City chooser / Confirming  */}
              <CityAndProductsBlock dataToOrder={data.itemsToOrder} />

              {/* User info (Phone/Name/Email) */}
              <ContactInformationBlock />

              {/* Delivery method */}
              <DeliveryInformationBlock />

              {/* Payment method */}
              <PaymentMethodBlock />
            </div>

            {/* Here is create order button */}
            <CreateOrder className="bg-card p-4 h-fit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
