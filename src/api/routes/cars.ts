import { randomDate6m } from '../../utils/dates';
import cars from '../mocks/cars';
import { Car } from '../models/Car';

export const requestGetCars = async (): Promise<Car[]> =>
  new Promise(res => {
    setTimeout(() => {
      res(
        cars.map((car, index) => ({
          id: index + 1,
          ...car,
          // Generate a random date within the next 6 months for each car with ISO string format
          auctionDateTime: randomDate6m(index).toISOString(),
          bids: [],
        })),
      );
    }, 1000);
  });
