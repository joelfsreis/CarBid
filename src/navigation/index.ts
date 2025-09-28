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
import HeaderRight from '../components/HeaderRight';
import HeaderLeft from '../components/HeaderLeft';

const defaultOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
};

export const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: { ...defaultOptions, title: 'CarBid', headerRight: HeaderRight },
    },
    Details: {
      screen: Details,
      options: {
        ...defaultOptions,
        title: 'Car Details',
        headerLeft: HeaderLeft,
      },
    },
    Filters: {
      screen: Filters,
      options: {
        headerShown: false,
        animation: 'none',
        presentation: 'transparentModal',
        contentStyle: { flex: 1, backgroundColor: '#D3D3D380' },
      },
    },
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
