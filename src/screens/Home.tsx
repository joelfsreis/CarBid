import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Car } from '../api/models/Car';
import CarCard from '../components/CarCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import useFilters from '../hooks/useFilters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { filteredCars, isLoading } = useFilters();

  const renderItem = useCallback(
    ({ item }: { item: Car }) => {
      const navigate = () => navigation.navigate('Details', { carId: item.id });

      return <CarCard car={item} onPress={navigate} />;
    },
    [navigation],
  );

  const ListEmptyComponent = useCallback(() => {
    return isLoading ? (
      <ActivityIndicator />
    ) : (
      <Text style={styles.alignText}>No cars available</Text>
    );
  }, [isLoading]);

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <FlatList<Car>
        data={filteredCars}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        style={styles.container}
        contentContainerStyle={styles.content}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  alignText: { textAlign: 'center' },
});

export default Home;
