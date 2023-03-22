import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Provider as PaperProvider } from 'react-native-paper';
//import App from './src/App';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function EntryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.selectEntry}>
        <Button
          mode='text'
          textColor='white'
          style={styles.headlineText}
          //onPress={() => SwitchEntry(1)}
        >
          SIGN UP
        </Button>
        <Button
          mode='text'
          textColor='white'
          style={styles.headlineText}
          //onPress={() => SwitchEntry(2)}
        >
          LOG IN
        </Button>
      </View>
      <View style={[styles.inputContainer, {bottom: 200}]}>
        <TextInput
          editable
          numberOfLines={1}
          placeholder='USERNAME'
          //value={username}
          style={styles.accountInput}
        />
      </View>
      <View style={[styles.inputContainer, {bottom: 100}]}>
        <TextInput
          editable
          numberOfLines={1}
          placeholder='PASSWORD'
          secureTextEntry
          //value={password}
          style={styles.accountInput}
        />
      </View>

      <View style={styles.button}>
        <Button 
          title='Next Page.....'
          //onPress={() => navigation.navigate('Details')}
          buttonColor='#3585AE'
          textColor='white'
          mode='contained'
        >
          Next Page......
        </Button>
      </View>
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

  button: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginVertical: 10,
    width: 200,
    height: 100,
  },

  headlineText: {
    color: 'white',
    fontSize: 24,
    bottom: 25,
    fontWeight: 'bold',
    margin: 45,
  },

  inputContainer: {
    flex: 0.05,
    height: 55,
    width: 298.5,
    bottom: 300,
    margin: -95,
    marginTop: 20,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#D9D9D9',
    alignItems: 'flex-start',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },

  selectEntry: {
    marginTop: 300,
    bottom: 200,
    flexDirection: 'row',
  },
});