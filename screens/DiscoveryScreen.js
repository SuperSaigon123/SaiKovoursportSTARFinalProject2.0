import * as React from 'react';
import { View, Text, StyleSheet, TextInput, useState} from 'react-native';
import {Button} from 'react-native-paper'


export default function DiscoveryScreen() {
  const [players, setPlayers] = React.useState([]);
  const [player, setPlayer] = React.useState('Player Name')

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Search players....."
        placeholderTextColor="white"
        color="white"
      />

    <Button 
      icon="magnify" 
      mode="contained" 
      buttonColor='#20526B'
      style={styles.button}
      onPress={() => console.log('Pressed')}>
        SEARCH
    </Button>
      

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
    paddingLeft: 20,
    backgroundColor: '#20526B',
    color: 'black'
  },
  button: {
    bottom: 450
  }
});


