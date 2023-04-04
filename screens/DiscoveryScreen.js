import * as React from 'react';
import { View, Text } from 'react-native';


export default function DiscoveryScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('This is the "Discovery" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>
        Discovery Screen
      </Text>
    </View>
  );
}
