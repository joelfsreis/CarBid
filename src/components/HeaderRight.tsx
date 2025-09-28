import React, { useCallback } from 'react';
import { SPACING } from '../utils/theme';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

const HeaderRight = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOnPress = useCallback(
    () => navigation.navigate('Filters'),
    [navigation],
  );

  return (
    <Pressable onPress={handleOnPress} hitSlop={SPACING.medium}>
      <Ionicons name="filter-circle-outline" size={SPACING.xlarge} />
    </Pressable>
  );
};

export default HeaderRight;
