import { useLazyGetCitiesQuery } from '@/store/api/novapostApi';
import { selectCity, setCity } from '@/store/slices/checkout';
import { useDispatch, useSelector } from 'react-redux';
import { SingleValue } from 'react-select';
import Select from 'react-select/async';
const CitySelect = () => {
  const dispatch = useDispatch();
  const storedCity = useSelector(selectCity);
  const [getCities] = useLazyGetCitiesQuery();

  const getOptions = async (query: string) => {
    const cities = await getCities({ limit: 10, page: 1, findByString: query }).unwrap();

    return cities.map((city) => ({
      value: city.Ref,
      label: city.Description,
    }));
  };
  const onChange = (option: SingleValue<{ value: string; label: string }>) => {
    dispatch(setCity({ name: option?.label as string, ref: option?.value as string }));
  };

  return (
    <Select
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      cacheOptions
      loadOptions={getOptions}
      defaultOptions
      value={{ value: storedCity.ref, label: storedCity.name }}
      onChange={onChange}
    />
  );
};

export default CitySelect;
