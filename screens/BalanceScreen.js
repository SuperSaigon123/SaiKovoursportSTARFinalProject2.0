import * as React from 'react';
import { View, Text, StyleSheet, TextInput, useState, useEffect, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import InputSpinner from 'react-native-input-spinner'
import { getAuth, onAuthStateChanged, getFireBase} from 'firebase/auth'
import { doc, getFirestore, updateDoc, collection, query, where, getDoc} from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser
const userRef = doc(db, 'users', user.uid);

export default function BalanceScreen() {
  const [balance, setBalance] = React.useState(getBalance);
  const [incrementPUR, setIncrementPUR] = React.useState(200);
  const [incrementWITH, setIncrementWITH] = React.useState(200);

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 32, marginBottom: 10, fontWeight: 'bold'}}>BALANCE: {balance} SC</Text>
      <Text style={{color: 'grey', fontSize: 24, marginBottom: 70}}>Recently spent:</Text>
      
      <Text style={{marginTop: 20, marginBottom: 20, color: 'white'}}>How much SC would you like to purchase?</Text>

      <InputSpinner
        max={4000}
        min={200}
        step={200}
        colorMax={"#f04048"}
	      colorMin={"#f04048"}
        skin={'modern'}
        style={{marginBottom: 20}}
        onChange={(incrementPUR) => {
          console.log("Buying " + incrementPUR + " SC");
          setIncrementPUR(incrementPUR)
        }}
      ></InputSpinner>
      
      <Button
        onPress={() => modifyBalance(1)}
        textColor='white'
        buttonColor='green'  
        mode="contained"
        style={{marginBottom: 40}}
      >PURCHASE</Button>

      <Text style={{marginTop: 20, marginBottom: 20, color: 'white'}}>How much SC would you like to withdraw?</Text>

      <InputSpinner
        max={4000}
        min={200}
        step={200}
        colorMax={"#f04048"}
	      colorMin={"#f04048"}
        skin={'modern'}
        style={{marginBottom: 20}}
        onChange={(incrementWITH) => {
          console.log("Withdrawing " + incrementWITH + " SC");
          setIncrementWITH(incrementWITH)
        }}
      ></InputSpinner>

      <Button
        onPress={() => modifyBalance(2)}
        textColor='white'
        buttonColor='red'  
        mode="contained"
      >WITHDRAW</Button>
      
    </View>
  );

  async function getBalance(){
    const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          if (docSnap.data().userBalance == "NaN"){
            return 0;
          }
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
  }

  async function modifyBalance(type) {
    try {
        console.log(1)
        
        console.log(2)
        if (type === 1) {
          if (balance + incrementPUR > 10000) {
            Alert.alert('Error', 'SC capped at 10,000 SC');
          } else {
            setBalance(balance + incrementPUR);
          }
        } else {
          if (incrementWITH > balance) {
            Alert.alert('Error', 'You cannot withdraw more than your account balance');
          } else {
            setBalance(balance - incrementWITH);
          }
        }
  
        console.log(3)
        

        await updateDoc(userRef, {
          userBalance: balance,
        }); 
        
      
    } catch (error) {
      console.log('Error updating data:', error);
    }
  }
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
  spinner: {
    textColor: 'white'
  }
});

