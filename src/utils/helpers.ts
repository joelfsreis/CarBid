import { Car } from '../api/models/Car';
import { Filter } from '../state/useFilterOptionsState';

const sanitizeFilterInput = (
  value: string | number | boolean | Date | number | number[],
  filterValue: string | number | boolean | Date | number[],
  type?: 'date',
) => {
  switch (typeof value) {
    case 'string':
      return type === 'date'
        ? [+new Date(value), +new Date(filterValue as string)]
        : [String(value), String(filterValue)];
    case 'number':
    case 'boolean':
      return [Number(value), Number(filterValue)];
    case 'object':
      return [];
  }
};

export const filterEval = (car: Car) => {
  return function filter({
    filter: fKey,
    filterValue: filterValueUnformatted,
    filterType,
    filterValueType,
  }: Filter & { filter: keyof Car }) {
    const [value, filterValue] = sanitizeFilterInput(
      car[fKey],
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
