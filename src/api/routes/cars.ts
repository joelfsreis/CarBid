import cars from '../mocks/cars';
import { Car } from '../models/Car';

export const requestGetCars = async (): Promise<Car[]> =>
  new Promise(res => {
    setTimeout(() => {
      res(cars.map((car, index) => ({ id: index + 1, ...car })));
    }, 1000);
  });
