import { useLazyGetWarehousesQuery } from '@/store/api/novapostApi';
import { selectCity } from '@/store/slices/checkout';
import { useSelector } from 'react-redux';
import { SingleValue } from 'react-select';
import Select from 'react-select/async';
interface Props {
  value: { value: string; label: string } | null;
  onChange: (value: SingleValue<{ value: string; label: string }>) => void;
}
const NPWarehoseSelect: React.FC<Props> = ({ value, onChange }) => {
  const city = useSelector(selectCity);
  const [getWarehouses] = useLazyGetWarehousesQuery();
  const getOptions = async (query: string) => {
    const cities = await getWarehouses({ limit: 10, page: 1, findByString: query, cityRef: city.ref }).unwrap();

    return cities.map((city) => ({
      value: city.Ref,
      label: city.Description,
    }));
  };
  return (
    <Select
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      placeholder="Choose warehouse..."
      cacheOptions
      loadOptions={getOptions}
      defaultOptions
      onChange={onChange}
      value={value}
    />
  );
};

export default NPWarehoseSelect;
