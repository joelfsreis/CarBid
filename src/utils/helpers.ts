import { Car } from "../api/models/Car";
import { Filter } from "../state/useFilterOptionsState";

export const keyBy = <T>(
  collection: T[],
  iteratee: (item: T) => string | number,
) => {
  const result: (string | number)[] = [];
  const map = collection.reduce((acc, element) => {
    const key = iteratee(element);
    acc[key] = element;
    result.push(key);
    return acc;
  }, {} as Record<string | number, T>);
  return { map, result };
};

const sanitizeFilterInput = (
  value: string | number | boolean | Date,
  filterValue: string | number | boolean | Date,
  type: 'string' | 'number' | 'boolean' | 'date',
) => {
  switch (type) {
    case 'string':
      return [String(value), String(filterValue)];
    case 'number':
    case 'boolean':
      return [Number(value), Number(filterValue)];
    case 'date':
      return [
        +new Date(typeof value === 'boolean' ? Number(value) : value),
        +new Date(
          typeof filterValue === 'boolean' ? Number(filterValue) : filterValue,
        ),
      ];
  }
};

export const filterEval = (car: Car) => {
  return function filter({
    filter: filterKey,
    filterValue: filterValueUnformatted,
    filterType,
    filterValueType,
  }: Filter) {
    const [value, filterValue] = sanitizeFilterInput(
      car[filterKey],
      filterValueUnformatted,
      filterValueType,
    );

    switch (filterType) {
      case 'eq':
        return value === filterValue;
      case 'gte':
        return value >= filterValue;
      case 'lte':
        return value <= filterValue;
      default:
        return false;
    }
  };
};