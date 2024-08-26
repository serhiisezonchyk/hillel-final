import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  value: [number, number];
  onPriceChange: ({ value }: { value: [number, number] }) => void;
};

const PriceFilter: React.FC<Props> = ({ className, value, onPriceChange }) => {
  return (
    <Card className={cn('p-2 space-y-2', className)}>
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-bold">Price</CardTitle>
        <CardDescription>Select a price range</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              name="min"
              min={0}
              type="number"
              placeholder="$0"
              value={value[0] === 0 ? '' : value[0]}
              onChange={(e) => onPriceChange({ value: [value[0], +e.target.value] })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="number"
              name="max"
              min={0}
              onChange={(e) => onPriceChange({ value: [value[0], +e.target.value] })}
              placeholder="$1000"
              value={value[1] === 0 ? '' : value[1]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceFilter;
