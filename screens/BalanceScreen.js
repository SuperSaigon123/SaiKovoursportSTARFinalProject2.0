import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert, useState} from 'react-native';
import { Button } from 'react-native-paper';
import InputSpinner from 'react-native-input-spinner'
import { getAuth, onAuthStateChanged, getFireBase} from 'firebase/auth'
import { doc, getFirestore, updateDoc, collection, query, where, getDoc, onSnapshot} from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser

let initialBalance = 0;
let incrementTest = 1;

let userRef = null;

export default function BalanceScreen() {
  const [balance, setBalance] = React.useState(0);
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
          console.log(user.uid)
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
          console.log("Balance: " + balance)
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

  async function modifyBalance(type) {
    try {
        if (user){
          getUpdatedBalance();
          userRef = doc(db, 'users', user.uid);

          console.log(1)
        
          console.log(2)

          if (type === 1) {
            if (balance + incrementPUR > 10000) {
              Alert.alert('Error', 'SC capped at 10,000 SC');
            } else {

              console.log(initialBalance + " " + balance + " " + incrementPUR)
              if (incrementTest == 1){
                await updateDoc(userRef, {
                  userBalance: initialBalance * 1 + balance + incrementPUR,
                }); 
              } else{
                await updateDoc(userRef, {
                  userBalance: balance + incrementPUR,
              }); 
              }
              

              if (incrementTest == 1){
                setBalance(initialBalance * 1 + balance + incrementPUR);
              } else{
                setBalance(balance + incrementPUR);
              }

              incrementTest++;
              
            }
          } else {
            if (incrementWITH > balance) {
              Alert.alert('Error', 'You cannot withdraw more than your account balance');
            } else {
              console.log(initialBalance + " " + balance + " " + incrementWITH)
              if (incrementTest == 1){
                await updateDoc(userRef, {
                  userBalance: initialBalance * 1 + balance - incrementWITH,
                }); 
              } else {
                await updateDoc(userRef, {
                  userBalance: balance - incrementWITH,
                }); 
              }
              
              if (incrementTest == 1){
                setBalance(initialBalance * 1 + balance - incrementWITH);
              } else{
                setBalance(balance - incrementWITH);
              }

              incrementTest++;
              
            }
          }
    
          console.log(3)
        }
        
        
      
    } catch (error) {
      console.log('Error updating data:', error);
    }
  }
}

async function getUpdatedBalance(){
  if (user){
    const tempRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(tempRef)
  
    if (docSnap.exists()) {
      console.log("Balance: " + docSnap.data().userBalance)
      initialBalance = docSnap.data().userBalance;
      console.log("Balance 2: " + initialBalance)
      return docSnap.data().userBalance;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    console.log(user.uid)
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

