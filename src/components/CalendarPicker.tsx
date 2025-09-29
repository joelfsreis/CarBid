import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { commonStyles, SPACING } from '../utils/theme';
import DatePicker from 'react-native-date-picker';
import { useFilterOptionsState } from '../state/useFilterOptionsState';
import { format } from 'date-fns';

type CalendarPickerProps = {
  label: string;
  value: any;
  filter: 'auctionDateTimeFrom' | 'auctionDateTimeTo';
  filterType: 'gte' | 'lte';
  style?: ViewStyle;
};

const CalendarPicker = ({
  label,
  value,
  style,
  filter,
  filterType,
}: CalendarPickerProps) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const { updateSelectedFilters } = useFilterOptionsState();

  return (
    <>
      <View style={[styles.container, style]}>
        <Text style={commonStyles.label}>{label}</Text>
        <Pressable onPress={() => setDatePickerVisible(true)}>
          <View style={commonStyles.input}>
            <Ionicons name="calendar-outline" size={SPACING.large} />
            <Text>
              {value ? format(value, 'dd/MM/yyyy, HH:mm') : 'Select a date...'}
            </Text>
          </View>
        </Pressable>
      </View>
      <DatePicker
        modal
        open={datePickerVisible}
        minuteInterval={15}
        onConfirm={date => {
          updateSelectedFilters({
            filter: 'auctionDateTime',
            filterKey: filter,
            filterValue: date.toISOString(),
            filterType,
            filterValueType: 'date',
          });
          setDatePickerVisible(false);
        }}
        onCancel={() => {
          setDatePickerVisible(false);
        }}
        date={value ? new Date(value) : new Date()}
        mode="datetime"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.medium,
  },
});

export default CalendarPicker;
