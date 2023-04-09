import * as React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';


export default function BalanceScreen() {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert('This is the "Balance" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>
        Balance Screen
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

