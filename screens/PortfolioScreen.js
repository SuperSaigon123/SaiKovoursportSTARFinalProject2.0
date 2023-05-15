import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert('This is the "Portfolio" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>
        Portfolio Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
