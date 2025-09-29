import React from 'react';
import DropdownSelect from 'react-native-input-select';
import { DropdownProps } from 'react-native-input-select/lib/typescript/src/types/index.types';
import { useFilterOptionsState } from '../state/useFilterOptionsState';
import { commonStyles } from '../utils/theme';

type SelectProps = Pick<
  DropdownProps,
  'label' | 'options' | 'selectedValue'
> & {
  filter: 'make' | 'model';
  onChangeCb?: () => void;
};

const Select = ({
  filter,
  label,
  options,
  selectedValue,
  onChangeCb,
}: SelectProps) => {
  const { updateSelectedFilters } = useFilterOptionsState();
  return (
    <DropdownSelect
      label={label}
      placeholder="Select an option..."
      labelStyle={commonStyles.label}
      dropdownStyle={commonStyles.input}
      options={options}
      selectedValue={selectedValue}
      onValueChange={value => {
        updateSelectedFilters({
          filter,
          filterKey: filter,
          filterValue: value as string,
          filterType: 'eq',
        });
        onChangeCb?.();
      }}
    />
  );
};

export default Select;
