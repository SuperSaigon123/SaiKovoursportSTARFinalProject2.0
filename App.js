import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Provider as PaperProvider } from 'react-native-paper';
//import App from './src/App';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const theme = {
  
}

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headlineText}>LOG IN</Text>
      <View style={styles.button}>
        <Button 
          title='Next Page.....'
          onPress={() => navigation.navigate('Details')}
          buttonColor='#3585AE'
          textColor='white'
          mode='contained'
        >
        <Text style={{color: 'white', fontSize: 15}}>Next Page......</Text>
      </Button>
      </View>

      <View style={[styles.inputContainer, {marginBottom: 100}]}>
        <TextInput
          editable
          numberOfLines={1}
          placeholder='USERNAME'
          //value={username}
          style={styles.accountInput}
        />
      </View>
      <View style={[styles.inputContainer, {bottom: 350}, {marginTop: 0}]}>
        <TextInput
          editable
          numberOfLines={1}
          placeholder='PASSWORD'
          //value={password}
          style={styles.accountInput}
        />
      </View>

    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Overview' }} />
          <Stack.Screen name='Details' component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'space-evenly',
    justifyContent: 'center',
  },
});
