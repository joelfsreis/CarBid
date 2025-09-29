import { StaticScreenProps } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Car } from '../api/models/Car';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FavoriteButton from '../components/FavoriteButton';
import { commonStyles, SPACING } from '../utils/theme';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import useMutateCar from '../hooks/query/useMutateCar';
import useCarDetails from '../hooks/useCarDetails';
import Button from '../components/Button';
import { formatBidDate } from '../utils/dates';

const BID = 500;
const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
type DetailsProps = StaticScreenProps<{ carId: Car['id'] }>;

const Details = ({ route }: DetailsProps) => {
  const { carId } = route.params;
  const { bottom } = useSafeAreaInsets();

  const car = useCarDetails(carId);
  const { mutate } = useMutateCar();

  const history = useMemo(() => {
    return car?.bids.length ? car.bids[car.bids.length - 1] : undefined;
  }, [car?.bids]);

  const bidData = useMemo(
    () => formatBidDate(car?.auctionDateTime || new Date()),
    [car?.auctionDateTime],
  );

  const rows = useMemo(() => {
    return car
      ? [
          { label: 'Fuel type', description: car.fuel },
          { label: 'Year', description: car.year },
          {
            label: 'Mileage',
            description: `${Number(car.mileage).toLocaleString()} km`,
          },
          {
            label: 'Starting bid',
            description: `${Number(car.startingBid).toLocaleString()} €`,
            children: <Ionicons name="hammer-sharp" size={SPACING.medium} />,
          },
          {
            label: 'Start auction in',
            description: bidData.message,
            children: (
              <Ionicons name="calendar-outline" size={SPACING.medium} />
            ),
          },
        ]
      : [];
  }, [bidData.message, car]);

  return car ? (
    <View style={[commonStyles.flex, { paddingBottom: bottom }]}>
      <View>
        <View style={styles.img}>
          <Text>Image Placeholder</Text>
        </View>
        <View style={styles.absolute}>
          <FavoriteButton
            favorite={car.favourite}
            toggleFavorite={() => mutate({ ...car, favourite: !car.favourite })}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.descriptionContainer}>
        <View style={styles.containerRow}>
          <Ionicons name="car-sport" size={SPACING.xlarge} />
          <View style={commonStyles.flex}>
            <Text
              numberOfLines={3}
              style={commonStyles.title}
            >{`${car.make} ${car.model} (${car.engineSize})`}</Text>
          </View>
        </View>
        {rows.map(({ label, description, children }) => (
          <View key={label} style={styles.containerRow}>
            {children}
            <Text style={commonStyles.bold}>{label}:</Text>
            {description ? <Text>{description}</Text> : null}
          </View>
        ))}
        <View style={styles.containerCol}>
          <Text style={commonStyles.bold}>Description:</Text>
          <Text>{LOREM_IPSUM}</Text>
        </View>
        {history ? (
          <View style={[styles.containerRow, { marginTop: SPACING.large }]}>
            <Ionicons name="warning-outline" size={SPACING.medium} />
            <Text style={commonStyles.bold}>Your Last Bid:</Text>
            <Text>{`${Number(history).toLocaleString()} €`}</Text>
          </View>
        ) : null}
      </ScrollView>
      <View style={{ padding: SPACING.medium }}>
        <Button
          onPress={() => {
            mutate({ ...car, bids: [(history ?? car.startingBid) + BID] });
          }}
          iconName="hammer-outline"
          disabled={bidData.ended}
        >
          {history ? 'Increase Bid' : 'Place Bid'}
        </Button>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: SPACING.medium,
    right: SPACING.medium,
  },
  descriptionContainer: {
    flex: 1,
    padding: SPACING.medium,
    gap: SPACING.small,
  },
  containerCol: {
    flexDirection: 'column',
    gap: SPACING.xsmall,
  },
  containerRow: {
    flexDirection: 'row',
    gap: SPACING.xsmall,
    alignItems: 'center',
  },
  img: {
    height: SPACING.large * 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
