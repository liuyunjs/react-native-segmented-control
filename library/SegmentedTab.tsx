import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  processColor,
  Appearance,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';

export type SegmentedTabProps = {
  first: boolean;
  last: boolean;
  value: string;
  tintColor?: string;
  active: boolean;
  disabled?: boolean;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
};

const red = (c: number) => {
  return (c >> 16) & 255;
};
const green = (c: number) => {
  return (c >> 8) & 255;
};
const blue = (c: number) => {
  return c & 255;
};

const resBgColor = (c: number) => {
  return red(c) * 0.213 + green(c) * 0.715 + blue(c) * 0.072 > 255 / 2
    ? '#333'
    : Appearance?.getColorScheme?.() === 'dark'
    ? '#ccc'
    : '#fff';
};

export const SegmentedTab: React.FC<SegmentedTabProps> = ({
  first,
  value,
  last,
  tintColor,
  active,
  disabled,
  onPress,
  textStyle,
}) => {
  const c = processColor(tintColor) as number;

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled || active}>
      <View
        style={[
          styles.container,
          { borderColor: tintColor },
          active && { backgroundColor: tintColor },
          first ? styles.first : styles.transparent,
          last && styles.last,
        ]}>
        <View style={styles.center}>
          <Text
            style={[
              styles.text,
              textStyle,
              { color: !active ? tintColor : resBgColor(c) },
            ]}>
            {value}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    borderWidth: StyleSheet.hairlineWidth,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  first: {
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
  },
  transparent: {
    borderStartColor: 'transparent',
  },
  last: {
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
  },
  text: {
    fontSize: 14,
  },
});
