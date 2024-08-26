import { Product } from '@/types';
import { CircleOffIcon, Loader } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  isLoading: boolean;
  data: Product[];
  onClick: () => void;
}

const SearchList: React.FC<Props> = ({ isLoading, data, onClick }) => {
  if (isLoading) return <SearchListLoader />;
  if (data.length === 0) return <SearchListEmpty />;
  return (
    <div className="space-y-4 divide-y-2">
      {data.map((el) => (
        <SearchItem key={el.id} item={el} onClick={onClick} />
      ))}
    </div>
  );
};

const SearchListLoader = () => <Loader className="size-4 animate-spin " />;
const SearchListEmpty = () => (
  <div className="flex flex-col items-center">
    <CircleOffIcon size={16} />
    <p>No data found</p>
  </div>
);
const SearchItem = ({ item, onClick }: { item: Product; onClick?: () => void }) => {
  return (
    <Link to={`/${item.category}/${item.id}`} onClick={onClick} className="w-full flex bg-card p-2 rounded-sm gap-4">
      <img className="size-[100px] object-contain" src={item.image} />
      <div>
        <p className="text-sm text-muted-foreground">{item.title}</p>
        <span className="text-md text-foreground">${item.price}</span>
      </div>
    </Link>
  );
};

export default SearchList;
