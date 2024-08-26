import HelmetMetadata from '@/components/shared/HelmetMetadata';
import { Skeleton } from '@/components/ui/skeleton';
import { capitalize } from '@/lib/utils';
import { useGetCategoriesQuery } from '@/store/api/productApi';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  if (isLoading) return <CategoriesPageSkeleton />;
  return (
    <div className="mt-2">
      <HelmetMetadata title="Categories | Comfy" />
      <div className="container">
        <div className="divide-y-2 divide-primary flex flex-col">
          {categories?.map((el) => (
            <Link to={`/${el}`} className="w-full py-2 flex flex-row justify-between" key={el}>
              <p>{capitalize(el)}</p>
              <ArrowRight className="text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

const CategoriesPageSkeleton = () => (
  <div className="mt-2">
    <div className="container">
      <div className="gap-2 flex flex-col">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton className="h-10 w-full" key={i} />
          ))}
      </div>
    </div>
  </div>
);
