import { Car } from '../api/models/Car';
import { requestGetCars } from '../api/routes/cars';
import { useFilterOptionsState } from '../state/useFilterOptionsState';

export const fetchCars = async (): Promise<Car[]> => {
  const data = await requestGetCars();

  const selectInfoMap = new Map<string, Set<string>>();

  data.forEach((car: Car) => {
    const make = selectInfoMap.get(car.make);
    make
      ? make.add(car.model)
      : selectInfoMap.set(car.make, new Set([car.model]));
  });

  useFilterOptionsState.getState().setSelectOptions({
    make: Array.from(selectInfoMap.keys())
      .sort()
      .map(make => ({ label: make, value: make })),
    models: Array.from(selectInfoMap.values())
      .flatMap(models => Array.from(models))
      .sort()
      .map(model => ({ label: model, value: model })),
    model: Array.from(selectInfoMap.keys()).reduce(
      (acc, make) => ({
        ...acc,
        [make]: Array.from(selectInfoMap.get(make) || [])
          .sort()
          .map(model => ({ label: model, value: model })),
      }),
      {},
    ),
  });

  return data;
};
