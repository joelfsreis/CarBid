import useCars from '../hooks/query/useCars';
import { useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { Car } from '../api/models/Car';
import CarCard from '../components/CarCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: cars, isLoading } = useCars();

  const renderItem = useCallback(
    ({ item }: { item: Car }) => {
      const navigate = () => navigation.navigate('Details', { car: item });

      return <CarCard car={item} onPress={navigate} />;
    },
    [navigation],
  );

  const ListEmptyComponent = useCallback(() => {
    return isLoading ? <ActivityIndicator /> : <Text>No cars available</Text>;
  }, [isLoading]);

  return (
    <FlatList<Car>
      data={cars}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      style={styles.container}
      contentContainerStyle={styles.content}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default Home;
