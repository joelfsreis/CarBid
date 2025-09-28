import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import { SPACING } from '../utils/theme';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

const HeaderLeft = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOnPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <Pressable onPress={handleOnPress} hitSlop={SPACING.medium}>
      <Ionicons name="chevron-back-circle-outline" size={SPACING.xlarge} />
    </Pressable>
  );
};

export default HeaderLeft;
