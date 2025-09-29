import { useMemo } from 'react';
import { useFilterOptionsState } from '../state/useFilterOptionsState';
import useCars from './query/useCars';
import { filterEval } from '../utils/helpers';

const useFilters = () => {
  const { data: cars, ...query } = useCars();
  const { selectedFilters } = useFilterOptionsState();

  const filteredCars = useMemo(() => {
    return !selectedFilters.length
      ? cars
      : cars?.filter(
          car =>
            selectedFilters.filter(filterEval(car)).length ===
            selectedFilters.length,
        );
  }, [cars, selectedFilters]);

  return { filteredCars, ...query };
};

export default useFilters;
