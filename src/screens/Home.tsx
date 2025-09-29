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
import { commonStyles } from '../utils/theme';

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
    return (
      <View style={styles.empty}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.alignText}>No cars available</Text>
        )}
      </View>
    );
  }, [isLoading]);

  return (
    <FlatList<Car>
      data={filteredCars}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      style={commonStyles.flex}
      contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  alignText: { textAlign: 'center' },
});

export default Home;
