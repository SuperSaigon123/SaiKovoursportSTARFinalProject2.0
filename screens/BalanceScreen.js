import * as React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import { Button } from 'react-native-paper';
import {InputSpinner} from 'react-native-input-spinner'

export default function BalanceScreen() {
  const [balance, setBalance] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 32, marginBottom: 10}}>BALANCE: </Text>
      <Text style={{color: 'grey', fontSize: 24}}>Recently spent:</Text>
      
      <Text>How much SC would you like to purchase?</Text>
      <InputSpinner
        max={10}
        min={2}
        step={2}
        colorMax={"#f04048"}
        colorMin={"#40c5f4"}
        onChange={(balance) => {
          console.log(balance);
        }}
      />;
      <Button>BUY</Button>

      <Text>How much SC would you like to withdraw?</Text>
      <TextInput
        style={styles.input}
        placeholder='0'
      ></TextInput>
      <Button>SELL</Button>
      
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
});

