import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SPACING } from '../utils/theme';
import Ionicons, {
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';

type ButtonProps = PropsWithChildren & {
  onPress: () => Promise<void> | void;
  iconName?: IoniconsIconName;
  color?: string;
  disabled?: boolean;
};

const Button = ({
  onPress,
  children,
  iconName,
  color,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.button,
          disabled && styles.disabled,
          { backgroundColor: color ?? 'purple' },
        ]}
      >
        {iconName && (
          <Ionicons name={iconName} size={SPACING.medium} color="white" />
        )}
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: SPACING.medium,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.small,
    gap: SPACING.small,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabled: { opacity: 0.5 },
});

export default Button;
