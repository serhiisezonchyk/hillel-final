import { ProductsList } from '@/components/product';
import AvailableString from '@/components/shared/AvailableString';
import BuyButton from '@/components/shared/BuyButton';
import HelmetMetadata from '@/components/shared/HelmetMetadata';
import ImageCarousel from '@/components/shared/ImageCarousel';
import PreviewImage from '@/components/shared/PreviewImage';
import RatingStars from '@/components/shared/RaitingStars';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { generateInt } from '@/lib/utils';
import { RootState } from '@/store';
import { useGetProductsByCategoryQuery, useGetSingleProductQuery } from '@/store/api/productApi';
import { selectIsInCart } from '@/store/slices/cart';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
const imagesCount = generateInt(1, 5);
const availableCount = generateInt(0, 10);

const SingleItemPage = () => {
  const { itemId } = useParams();
  const isInCart = useSelector((state: RootState) => selectIsInCart(state, +(itemId as string)));

  const { data, isLoading } = useGetSingleProductQuery(itemId as string);
  const { data: similarProducts, isLoading: isSimilarProductsLoading } = useGetProductsByCategoryQuery({
    category: data?.category as string,
    sort: 'asc',
    limit: 3,
  });
  const [count, setCount] = useState(1);
  const [previewOpened, setPreviewOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; description: string } | null>(null);

  const handlePreviewOpened = useCallback((open: boolean, img?: { src: string; id: number }) => {
    setPreviewOpened(open);
    if (img) setSelectedImage({ src: img.src, description: `Image ${img.id}` });
  }, []);
  if (isLoading) return <SingleItemPageSkeleton />;

  if (!data) return <Navigate to={'/404'} />;

  return (
    <div>
      <HelmetMetadata title={`${data.title} | Comfy`} />
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 md:border-[1px] md:border-border rounded-md">
          <div className="grid gap-4 justify-center">
            <ImageCarousel
              data={Array(imagesCount)
                .fill(data.image)
                .map((el) => ({
                  src: el,
                  alt: data.title,
                }))}
              classNames={{
                carousel: 'max-w-96 z-0',
              }}
              onImageClick={(img) => handlePreviewOpened(true, img)}
              withButtons
              navigation
              loop
            />
          </div>
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-xl sm:text-3xl lg:text-4xl mb-0">{data.title}</h1>
              <AvailableString availableCount={availableCount} />
              <div className="flex justify-between">
                <RatingStars rate={data.rating.rate} count={data.rating.count} size="small" />
                <p className="text-muted-foreground">Code: {data.id}</p>
              </div>
              <div>
                <p className="text-sm sm:text-md leading-relaxed">{data.description}</p>
              </div>

              <div className="flex gap-2 justify-between items-end">
                <div className="text-2xl md:text-4xl font-bold">${data.price}</div>
                <div className="flex flex-row gap-2 items-end h-[64px]">
                  {!isInCart && (
                    <div>
                      <label htmlFor="addToCard" className="m-0 text-xs">
                        Quantity:
                      </label>
                      <Input
                        id="addToCard"
                        type="number"
                        min={1}
                        value={count}
                        max={availableCount}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        disabled={availableCount < 1}
                        className="w-16 py-[1px]"
                      />
                    </div>
                  )}
                  <BuyButton
                    size="lg"
                    className="px-2 sm:px-8"
                    disabled={availableCount < 1}
                    product={{ ...data }}
                    quantity={count}
                    isInCart={isInCart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:border-border md:border-[1px] rounded-md mt-10 p-0 md:p-6 ">
          <h2 className="text-3xl font-light mb-2">Similar products</h2>
          <ProductsList
            data={similarProducts?.filter((el) => el.id !== data.id)}
            isLoading={isSimilarProductsLoading}
            className="flex flex-row overflow-hidden overflow-x-auto"
          />
        </div>
      </div>
      {previewOpened && selectedImage && (
        <PreviewImage open={previewOpened} onOpenChange={handlePreviewOpened} image={selectedImage} />
      )}
    </div>
  );
};

export default SingleItemPage;

const SingleItemPageSkeleton = () => (
  <div>
    <div className="container">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4 md:sticky md:top-20">
          <Skeleton className="size-full aspect-[2/3] w-full md:max-w-96" />
        </div>
        <div className="grid gap-4 md:gap-10 items-start prose">
          <div className="grid gap-4">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-40" />
            <div className="flex justify-between">
              <Skeleton className="w-40 h-16" />
              <Skeleton className="w-24 h-16" />
            </div>
            <div className="flex gap-2 justify-between">
              <Skeleton className="w-16 h-10" />
              <Skeleton className="w-40 h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
