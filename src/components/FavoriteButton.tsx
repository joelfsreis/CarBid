import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SPACING } from '../utils/theme';
import Ionicons from '@react-native-vector-icons/ionicons';

type FavoriteButtonProps = {
  favorite: boolean;
  toggleFavorite: () => void;
};

const FavoriteButton = ({ favorite, toggleFavorite }: FavoriteButtonProps) => {
  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      hitSlop={SPACING.medium}
    >
      <Ionicons
        name={favorite ? 'star-sharp' : 'star-outline'}
        size={SPACING.xlarge}
        color={favorite ? 'darkorange' : undefined}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
