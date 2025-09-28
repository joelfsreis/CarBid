import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS, TIME_IN_MS } from '../../utils/constants';
import { fetchCars } from '../../services/carService';

const useCars = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CARS,
    queryFn: fetchCars,
    staleTime: TIME_IN_MS.ONE_HOUR,
    refetchInterval: TIME_IN_MS.ONE_HOUR,
  });
};

export default useCars;
