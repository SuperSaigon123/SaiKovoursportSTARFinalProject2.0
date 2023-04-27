import * as React from 'react';
import { View, Text, StyleSheet, TextInput, useState, Image} from 'react-native';
import {Button} from 'react-native-paper'

import PlayerPreview from '../components/PlayerPreview';


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
      
      {players}
      <PlayerPreview
        PPG='0'
        RPG='0'
        APG='0'
        FG='0'
        playerPic={'https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png'}
        displayName={'Default Default'}
      >

      </PlayerPreview>

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
    bottom: 450,
    marginBottom: -60,
  }
});


