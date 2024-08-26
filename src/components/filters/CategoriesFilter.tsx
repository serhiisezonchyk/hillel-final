import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { capitalize, cn } from '@/lib/utils';

interface Props {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  data: string[] | undefined;
  isLoading: boolean;
  className?: string;
}
const CategoriesFilter: React.FC<Props> = ({ data, isLoading, selectedCategories, onCategoryChange, className }) => {
  if (isLoading) return <CategoriesFilterSkeleton className={className} />;

  return (
    <Card className={cn('p-2 space-y-2', className)}>
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-bold">Categories </CardTitle>
        <CardDescription>Select a category</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-0">
        {data?.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoryChange(category)}
            />
            <label htmlFor={category} className="text-sm font-medium">
              {capitalize(category)}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const CategoriesFilterSkeleton = ({ className }: { className?: string }) => (
  <Card className={cn('p-2 space-y-2', className)}>
    <CardHeader className="p-0">
      <CardTitle className="text-lg font-bold">Categories </CardTitle>
      <CardDescription>Select a category</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4 p-0">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <Skeleton className="h-5 w-32" key={i} />
        ))}
    </CardContent>
  </Card>
);

export default CategoriesFilter;
