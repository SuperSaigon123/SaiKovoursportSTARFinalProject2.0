import * as React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';


export default function DiscoveryScreen() {
  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Search players....."
        placeholderTextColor="black"
      />

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
  input: {
    height: 42,
    width: 310,
    margin: 12,
    marginBottom: 500,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#20526B',
    color: 'black'
  },
});


