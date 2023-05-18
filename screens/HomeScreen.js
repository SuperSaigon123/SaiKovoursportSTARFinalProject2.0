import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, useState, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../utils/hooks/useAuth';
import { IconButton, Button, Provider, Portal } from 'react-native-paper';
import { doc, getFirestore, getDoc, getDocs, collection, query, where, setDoc, onSnapshot, updateDoc, deleteDoc} from "firebase/firestore";
import PlayerPreview from '../components/PlayerPreview';
import PlayerPreviewWithoutModal from "../components/PlayerPreviewWithoutModal";

const auth = getAuth();
let activeUser = null;
const db = getFirestore();
let docSnapPlayer = null;

let arraycount = 0;

export default function HomeScreen() {
  const { user } = useAuth();

  const [playerArray, setPlayerArray] = React.useState([])
  const [playerNameArray, setPlayerNameArray] = React.useState([])
  const [isTextVisible, setIsTextVisible] = React.useState(true);
  const [isArrayVisible, setIsArrayVisible] = React.useState(false);
  
  

  useEffect(() => {
    
  }, [])

  return (
    <View style={styles.container}>

      {isTextVisible ? (
        <Text style={[{color: 'white', fontSize: 20}]}>You don't have any players. {'\n'}{'\n'} Go to the Discovery Screen!</Text>
      ) : null}

      {isArrayVisible ? (
        <View style={styles.playerContainer}>
          {playerArray.map((item) => (
            <PlayerPreview
              PPG={item.PPG}
              RPG={item.RPG}
              APG={item.APG}
              FG={item.FG}
              team={item.team}
              playerPic={item.playerPic}
              displayName={item.nameOfPlayer}
              onPress={() => updateQuantity(item.nameOfPlayer, item.SC)}
            />
          ))}
        </View>
       

      ) : null}
      
      <View style={{flexDirection: 'row'}}>
          <IconButton 
        icon="reload" 
        style={styles.button} 
        iconColor={"#3585AE"} 
        mode={'contained'} 
        onPress={() => fetchPlayers()}>

      </IconButton>

      <IconButton 
        icon="exit-to-app" 
        style={styles.button} 
        iconColor={"#3585AE"} 
        mode={'contained'} 
        onPress={() => signOut(auth)}>

      </IconButton>  
      </View>
      

    </View>
  );

  async function updateQuantity(playerName, SCValue){
    docSnapPlayer = await getDoc(doc(db, "users", user.uid, "players", playerName));
    //console.log(docSnapPlayer.data().quantity)

    if (docSnapPlayer.data() == undefined){
      Alert.alert("You do not own this player anymore.")
    } else {
      Alert.alert(playerName, "You have " + docSnapPlayer.data().quantity + " of " + playerName + " purchased at " + SCValue +" SC each")
    }
  }

  async function updatePlayerView(playerName){
    return await getDoc(doc(db, "users", user.uid, "players", item.nameOfPlayer));
  }

  async function fetchPlayers(){
    let count = 0;
    const collectionRef = collection(db, 'users', user.uid, 'players');
    const querySnapshot = await getDocs(collectionRef);

    console.log("Step 1")
    const nameValues = [];
    querySnapshot.forEach((doc) => {
      const nameValue = doc.get('nameOfPlayer');
      nameValues.push(nameValue);
    });
    console.log(nameValues)
    console.log(playerNameArray)

    const notIncludedArray = nameValues.filter((element) => !playerNameArray.includes(element));
    console.log(notIncludedArray)
    notIncludedArray.map(async (name) => {
    console.log("Step 2D")  
      if (name !== "Michael Jordan"){
        
        const tempPlayerRef = doc(db, 'users', user.uid, 'players', name);
        const documentSnapshot = await getDoc(tempPlayerRef);
        let newItem = null
        console.log("Step 2A")

        if (documentSnapshot.exists()) {
          const PPG = documentSnapshot.get('PPG');
          const APG = documentSnapshot.get('APG');
          const RPG = documentSnapshot.get('RPG');
          const FG = documentSnapshot.get('FG');
          const playerName = documentSnapshot.get('nameOfPlayer');
          const playerPic = documentSnapshot.get('playerPic');
          const quantity = documentSnapshot.get('quantity');
          const team = documentSnapshot.get('team');
          const playerID = documentSnapshot.get('playerID');
          const SCValue = documentSnapshot.get('thenSC');

          console.log("Step 2B")

          newItem = {PPG: PPG, APG: APG, RPG: RPG, FG: FG, team: team, playerPic: playerPic, nameOfPlayer: playerName, quantity: quantity, SC: SCValue}
          const updateName = [...playerNameArray, playerName]
          setPlayerNameArray(updateName)
          count++;
          console.log("Step 2C")
        } else {
          console.log('Document does not exist');
        }

        const newArray = [...playerArray, newItem];
        setPlayerArray(newArray)
      }
      console.log("Step 3")
    });

    const arrLength = playerArray.length
    console.log(arrLength)

    if (arrLength > 0){
      setIsTextVisible(false)
      setIsArrayVisible(true)
    } else {
      setIsTextVisible(true)
      setIsArrayVisible(false)
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
  button: {
    marginTop: 10,
    borderRadius: 20,
    bottom: 340,
    left: 140,
  },
  playerContainer: {
    flex: 0.1,
    top: 150
  },
  tempViewForAPI: {
    marginBottom: 100,
    alignItems: 'center'
  },
});