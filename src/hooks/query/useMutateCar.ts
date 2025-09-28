import { useMutation } from '@tanstack/react-query';
import { Car } from '../../api/models/Car';
import { queryClient } from '../../App';
import { QUERY_KEYS } from '../../utils/constants';

const useMutateCar = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.MUTATE_CAR,
    mutationFn: (newCar: Car) => {
      return Promise.resolve(newCar);
    },
    onMutate: async (newCar: Car) => {
      const previousCars = queryClient.getQueryData<Car[]>(QUERY_KEYS.CARS);

      // Optimistically update to the new value
      if (previousCars) {
        const findIndex = previousCars.findIndex(car => car.id === newCar.id);
        if (findIndex > -1) {
          // Update existing car
          const updatedCars = [...previousCars];
          updatedCars[findIndex] = newCar;
          queryClient.setQueryData<Car[]>(QUERY_KEYS.CARS, updatedCars);
        }
      }

      // Return a context object with the snapshotted value
      return { previousCars };
    },
  });
};

export default useMutateCar;
