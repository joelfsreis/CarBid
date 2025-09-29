import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Car } from '../api/models/Car';
import { commonStyles, SPACING } from '../utils/theme';
import FavoriteButton from './FavoriteButton';
import useMutateCar from '../hooks/query/useMutateCar';
import { formatBidDate } from '../utils/dates';
import Ionicons from '@react-native-vector-icons/ionicons';

const SIZE = 80;
const IMG_PLACEHOLDER =
  'https://www.shutterstock.com/shutterstock/photos/2444134751/display_1500/stock-vector-sleek-car-icon-vector-suitable-for-automotive-themed-projects-clean-lines-2444134751.jpg';

type CarCardProps = {
  car: Car;
  onPress: () => void;
};

const CarCard = ({ car, onPress }: CarCardProps) => {
  const { mutate } = useMutateCar();

  const bidData = useMemo(
    () => formatBidDate(car.auctionDateTime),
    [car.auctionDateTime],
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMethod="scale"
            resizeMode="center"
            style={styles.image}
            source={{ uri: IMG_PLACEHOLDER }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={commonStyles.bold}
          >{`${car.make} ${car.model} (${car.engineSize}) ${car.year}`}</Text>
          <Text style={commonStyles.label}>
            {bidData.ended ? bidData.message : `Auction in: ${bidData.message}`}
          </Text>
          <Text>{`Starting Bid: ${car.startingBid.toLocaleString()} €`}</Text>
          {car.bids.length ? (
            <View style={styles.bidContainer}>
              <Ionicons
                name="alert-circle-sharp"
                size={SPACING.large}
                color="purple"
              />
              <Text style={[commonStyles.label]}>
                {`Your current Bid: ${car.bids[
                  car.bids.length - 1
                ].toLocaleString()} €`}
              </Text>
            </View>
          ) : null}
        </View>
        <FavoriteButton
          favorite={car.favourite}
          toggleFavorite={() => mutate({ ...car, favourite: !car.favourite })}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: SPACING.medium,
    gap: SPACING.small,
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  imageContainer: {
    width: SIZE,
    height: SIZE,
    borderRadius: '50%',
    borderColor: 'black',
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '120%',
  },
  infoContainer: {
    flex: 1,
    gap: SPACING.xsmall,
  },
  bidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xsmall,
  },
});

export default CarCard;
