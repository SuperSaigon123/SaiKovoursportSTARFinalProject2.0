import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function EntryScreen({navigation}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  
  async function signUp(){
    if (email === '' || password === ''){
      setEmail({email});
      setPassword({password});
      
      Alert.alert(
        "Error",
        "Email and password are mandatory"
      )
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigation.navigate('Home');
    } catch {
      
    }

  }

  async function signIn(){

  }

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
          placeholder='EMAIL'
          //value={email}
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