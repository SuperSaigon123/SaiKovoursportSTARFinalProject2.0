import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert, Image, SafeAreaView} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
export default function SignUpScreen({navigation}) {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container, {flex: 0.5}]}>
        <Text style={styles.headlineText}>
          SIGN UP
        </Text>
      </View>
      <View style={[styles.inputContainer, {bottom: 250}]}>
        <TextInput
          placeholder='EMAIL'
          value={value.email}
          style={styles.accountInput}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />
      </View>
      <View style={[styles.inputContainer, {bottom: 150}]}>
        <TextInput
          placeholder='PASSWORD'
          value={value.password}
          style={styles.accountInput}
          onChangeText={(text) => setValue({ ...value, password: text })}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />
      </View>
      <View style={[styles.button, {marginTop: 80}]}>
        {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

        <Button 
          title='Next Page.....'
          onPress={signUp}
          buttonColor='#3585AE'
          textColor='white'
          mode='contained'
          style={styles.button}
        >
          Sign Up
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
    height: 65,
    alignSelf: 'center',
  },

  headlineText: {
    color: 'white',
    fontSize: 48,
    bottom: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    bottom: 120,
    //margin: 45,
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
    marginTop: 200,
    marginBottom: -50,
    bottom: 200,
    flexDirection: 'row',
  },
  
  accountInput: {
    height: 50,
    margin: 12,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
    width: 500,
    alignSelf: 'center'
  }
});