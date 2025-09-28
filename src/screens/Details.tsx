import { StaticScreenProps } from '@react-navigation/native';
import { Car } from '../api/models/Car';
import { StyleSheet, Text, View } from 'react-native';

type DetailsProps = StaticScreenProps<{ car: Car }>;

const Details = ({ route }: DetailsProps) => {
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <Text>{`${car.make} ${car.model} (${car.year})`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
