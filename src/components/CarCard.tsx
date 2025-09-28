import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Car } from '../api/models/Car';
import { SPACING } from '../utils/theme';
import FavoriteButton from './FavoriteButton';
import useMutateCar from '../hooks/query/useMutateCar';

const SIZE = 80;
const IMG_PLACEHOLDER =
  'https://www.shutterstock.com/shutterstock/photos/2444134751/display_1500/stock-vector-sleek-car-icon-vector-suitable-for-automotive-themed-projects-clean-lines-2444134751.jpg';

type CarCardProps = {
  car: Car;
  onPress: () => void;
};

const CarCard = ({ car, onPress }: CarCardProps) => {
  const { mutate } = useMutateCar();
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
          <Text>{car.make}</Text>
          <Text>{car.model}</Text>
          <Text>{car.year}</Text>
        </View>
        <View>
          <Text>{`${car.startingBid}€`}</Text>
          <Text>{new Date(car.auctionDateTime).toLocaleDateString()}</Text>
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
});

export default CarCard;
