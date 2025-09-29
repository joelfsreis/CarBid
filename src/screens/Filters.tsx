import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import {
  FilterTypes,
  useFilterOptionsState,
} from '../state/useFilterOptionsState';
import { StyleSheet, Text, View } from 'react-native';
import { commonStyles, SPACING } from '../utils/theme';
import { Switch } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Select from '../components/Select';
import CalendarPicker from '../components/CalendarPicker';
import Button from '../components/Button';

const Filters = () => {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  const {
    selectOptions,
    selectedFilters,
    updateSelectedFilters,
    removeSelectedFilter,
    resetSelectedFilters,
  } = useFilterOptionsState();

  const dropdownValues = useMemo(() => {
    const values: {
      [key in string]?: {
        value: string | number | boolean;
        filterType: FilterTypes;
      };
    } = {};
    selectedFilters.forEach(f => {
      values[f.filterKey] = { value: f.filterValue, filterType: f.filterType };
    });

    return values;
  }, [selectedFilters]);

  const snapPoints = useMemo(() => ['75%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      index === -1 && navigation.goBack();
    },
    [navigation],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
    >
      <BottomSheetView
        style={[styles.container, { paddingBottom: bottom + SPACING.large }]}
      >
        <View style={commonStyles.flex}>
          <Text style={[commonStyles.title, { marginBottom: SPACING.medium }]}>
            Filter by
          </Text>
          <Select
            label="Make"
            options={selectOptions.make}
            selectedValue={dropdownValues.make?.value}
            filter="make"
            onChangeCb={() => {
              dropdownValues.model?.value && removeSelectedFilter('model');
            }}
          />
          <Select
            label="Model"
            options={
              dropdownValues.make?.value
                ? selectOptions.model[dropdownValues.make.value as string] || []
                : selectOptions.models
            }
            selectedValue={dropdownValues.model?.value}
            filter="model"
          />
          <CalendarPicker
            filter="auctionDateTimeFrom"
            filterType="gte"
            label="Auction date from"
            value={dropdownValues.auctionDateTimeFrom?.value}
          />
          <CalendarPicker
            filter="auctionDateTimeTo"
            filterType="lte"
            label="Auction date to"
            value={dropdownValues.auctionDateTimeTo?.value}
            style={{ marginTop: SPACING.medium }}
          />
          <View style={styles.favoriteContainer}>
            <Text style={commonStyles.label}>Show only favorite cars</Text>
            <Switch
              value={!!dropdownValues.favourite?.value}
              onValueChange={value =>
                updateSelectedFilters({
                  filter: 'favourite',
                  filterKey: 'favourite',
                  filterValue: value,
                  filterType: 'eq',
                })
              }
            />
          </View>
        </View>
        <View style={styles.pressableContainer}>
          <View style={commonStyles.flex}>
            <Button
              color="red"
              iconName="remove-circle-outline"
              onPress={() => {
                resetSelectedFilters();
                bottomSheetRef.current?.close();
              }}
            >
              Clear
            </Button>
          </View>
          <View style={commonStyles.flex}>
            <Button
              color="gray"
              iconName="checkmark-done-circle-outline"
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            >
              Done
            </Button>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.medium,
    gap: SPACING.medium,
  },
  pressableContainer: {
    flexDirection: 'row',
    gap: SPACING.medium,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.medium,
  },
});

export default Filters;
