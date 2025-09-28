import { useMemo } from 'react';
import { Car } from '../api/models/Car';
import { queryClient } from '../App';
import { QUERY_KEYS } from '../utils/constants';

const useCarDetails = (carId: Car['id']) => {
  const cache = queryClient.getQueryData<Car[]>(QUERY_KEYS.CARS);
  return useMemo(() => cache?.find(car => car.id === carId), [cache, carId]);
};

export default useCarDetails;
