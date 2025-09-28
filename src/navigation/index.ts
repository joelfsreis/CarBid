import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Filters from '../screens/Filters';

const defaultOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
};

export const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: { ...defaultOptions, title: 'CarBid' },
    },
    Details: {
      screen: Details,
      options: { ...defaultOptions, title: 'Car Details' },
    },
    Filters: {
      screen: Filters,
      options: { ...defaultOptions, title: 'Filters' },
    },
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
