import useCars from './query/useCars';

const useFilters = () => {
  const { data: cars, ...query } = useCars();

  return { filteredCars: cars, ...query };
};

export default useFilters;
