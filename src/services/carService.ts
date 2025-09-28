import { Car } from '../api/models/Car';
import { requestGetCars } from '../api/routes/cars';

export const fetchCars = async (): Promise<Car[]> => {
  const data = await requestGetCars();

  return data;
};
