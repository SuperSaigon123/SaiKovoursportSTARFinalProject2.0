import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {Button} from 'react-native-paper';

export default function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        style={[{width: 300}, {height: 300}]}
        source={require('../assets/sportSTARLogoFINALWhite.png')}
      />

      <Button 
        mode='contained' 
        onPress={() => navigation.navigate('Sign Up')}>
        
        Sign Up
      </Button>

      <Button 
        mode='contained' 
        onPress={() => navigation.navigate('Sign In')} 
        style={[{marginTop: 30}]}>

        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});