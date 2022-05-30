import React from 'react';
import { SafeAreaView } from 'react-native';
import { SegmentedControl } from './library/main';

export default function App() {
  return (
    <SafeAreaView style={{ paddingHorizontal: 50 }}>
      <SegmentedControl
        tintColor="#000"
        style={{ marginHorizontal: 50 }}
        values={['one', 'two', 'three', 'four']}
        selectedIndex={0}
        onChange={console.log}
      />
    </SafeAreaView>
  );
}
