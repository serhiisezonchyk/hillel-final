import { cn } from '@/lib/utils';
import { CarouselImage } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselBottomNavigation,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
interface Props {
  classNames?: {
    carousel?: string;
    image?: string;
  };
  data: CarouselImage[];
  withButtons?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  navigation?: boolean;
  onImageClick?: ({ src, id }: { src: string; id: number }) => void;
}

const ImageCarousel: React.FC<Props> = ({
  classNames,
  data,
  withButtons = true,
  autoplayDelay,
  loop = false,
  navigation = false,
  onImageClick,
}) => {
  const plugins = [];
  if (autoplayDelay) {
    plugins.push(
      Autoplay({
        delay: autoplayDelay,
      }),
    );
  }

  return (
    <Carousel
      className={cn('w-full', classNames?.carousel)}
      opts={{
        align: 'start',
        loop,
      }}
      plugins={plugins}
    >
      <CarouselContent>
        {data.map(({ src, alt, link }, index) => (
          <CarouselItem key={`${src}-${index}`} className={cn('basis-full', classNames?.image)}>
            {link ? (
              <Link to={link}>
                <img loading="lazy" src={src} alt={alt} />
              </Link>
            ) : (
              <img
                loading="lazy"
                src={src}
                alt={alt}
                onClick={() =>
                  onImageClick?.({
                    src: src,
                    id: index,
                  })
                }
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      {withButtons && (
        <>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </>
      )}
      {navigation && <CarouselBottomNavigation className="w-full text-center" />}
    </Carousel>
  );
};

export default React.memo(ImageCarousel);
