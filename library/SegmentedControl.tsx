import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { darkly } from 'rn-darkly';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { SegmentedTab, SegmentedTabProps } from './SegmentedTab';

type SegmentedControlProps = ViewProps &
  Partial<Pick<SegmentedTabProps, 'textStyle' | 'tintColor' | 'disabled'>> & {
    values: string[];
    selectedIndex?: number;
    onChange?: (index: number) => void;
  };

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  disabled,
  onChange,
  tintColor,
  style,
  ...rest
}) => {
  const [currentIndex, setIndex] = useReactionState(selectedIndex);

  const last = values.length - 1;

  return (
    <View {...rest} style={[styles.container, style]}>
      {values.map((value, index) => (
        <SegmentedTab
          onPress={() => {
            setIndex(index);
            onChange?.(index);
          }}
          active={index === currentIndex}
          tintColor={tintColor}
          last={index === last}
          first={!index}
          disabled={disabled}
          value={value}
          key={value}
        />
      ))}
    </View>
  );
};

const DarklySegmentedControl = darkly(SegmentedControl, 'tintColor');

DarklySegmentedControl.defaultProps = {
  selectedIndex: 0,
  values: [],
  tintColor: '#1073ea',
  dark_tintColor: '#0d56ac',
};

export { DarklySegmentedControl as SegmentedControl };

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: 'row',
  },
});
