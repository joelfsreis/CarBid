import { StyleSheet } from 'react-native';

export const colors = {
  grayTransparent: '#D3D3D380',
};

export const SPACING = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
} as const;

export const commonStyles = StyleSheet.create({
  flex: { flex: 1 },
  label: { color: 'black', fontSize: 12, fontWeight: 'bold' },
  input: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: colors.grayTransparent,
    padding: SPACING.medium,
    borderRadius: SPACING.small,
    gap: SPACING.small,
    alignItems: 'center',
  },
  bold: { fontWeight: 'bold' },
  title: { fontSize: SPACING.large, fontWeight: 'bold' },
});
