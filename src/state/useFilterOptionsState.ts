import { create } from 'zustand';
import { Car } from '../api/models/Car';

type SelectOption = { label: string; value: string };
type SelectOptionsList = {
  make: SelectOption[];
  model: { [key: string]: SelectOption[] };
  models: SelectOption[];
};
export type FilterTypes = 'eq' | 'gte' | 'lte' | 'gt' | 'lt';
export type FilterValueType = 'string' | 'number' | 'boolean' | 'date';

export type Filter = {
  filter: keyof Car;
  filterKey: string;
  filterValue: string | number | boolean;
  filterType: FilterTypes;
  filterValueType?: 'date';
};

type FilterOptionsState = {
  selectedFilters: Filter[];
  selectOptions: SelectOptionsList;
  updateSelectedFilters: (filter: Filter) => void;
  resetSelectedFilters: () => void;
  removeSelectedFilter: (key: string) => void;
  setSelectOptions: (options: SelectOptionsList) => void;
};

export const useFilterOptionsState = create<FilterOptionsState>(set => ({
  selectedFilters: [],
  selectOptions: { make: [], model: {}, models: [] },
  setSelectOptions: options => set({ selectOptions: options }),
  removeSelectedFilter: (filterKey: string) =>
    set(state => ({
      selectedFilters: state.selectedFilters.filter(
        f => f.filterKey !== filterKey,
      ),
    })),
  resetSelectedFilters: () => set({ selectedFilters: [] }),
  updateSelectedFilters: (filter: Filter) =>
    set(state => ({
      selectedFilters: filter.filterValue
        ? [
            ...state.selectedFilters.filter(
              f => f.filterKey !== filter.filterKey,
            ),
            filter,
          ]
        : state.selectedFilters.filter(f => f.filterKey !== filter.filterKey),
    })),
}));
