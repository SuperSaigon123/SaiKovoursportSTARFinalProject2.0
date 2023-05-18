import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, useState, Image, Alert, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {Button, Modal, Provider, Portal} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import PlayerModal from '../components/PlayerModal'
import InputSpinner from 'react-native-input-spinner'
import { doc, getFirestore, getDoc, getDocs, collection, query, where, setDoc, onSnapshot, updateDoc, deleteDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth"

import PlayerPreview from '../components/PlayerPreview';

let PointsNum = 0;
let AssistNum = 0;
let ReboundNum = 0;
let FGTotal = 0;

let inputID = 0;

const db = getFirestore();
const auth = getAuth();
let user = null
let userRef = null;
let currentuid = 0;

export default function DiscoveryScreen() {
  const [players, setPlayers] = React.useState([]);
  const [player, setPlayer] = React.useState('Player Name')
  const [displayName, setDisplayName] = React.useState(player)

  const [PPG, setPPG] = React.useState(0);
  const [RPG, setRPG] = React.useState(0);
  const [APG, setAPG] = React.useState(0);
  const [FG, setFG] = React.useState(0);

  const [team, setTeam] = React.useState('FA')
  const [playerPic, setPlayerPic] = React.useState('https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png')
  const [playerPos, setPlayerPos] = React.useState('none')
  const [playerSC, setPlayerSC] = React.useState(0)

  const [playerYear, setPlayerYear] = React.useState(0)

  const [transQuantity, setTransQuantity] = React.useState(0)
  const [displayQuantity, setDisplayQuantity] = React.useState(0)

  const [defaultStatus, setDefaultStatus] = React.useState(true);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  


  useEffect(() => {
    if (defaultStatus){
      setPlayerSC(0)
    } else {
      
    }

    user = auth.currentUser;
    if (user){
      currentuid = user.uid
    }

  }, []);
  
  const containerStyle = {backgroundColor: '#2B2B2B', height: '110%', width: '100%'};

  return (
    <Provider>
      <Portal style={{height: '100%'}}>
        <Modal 
          visible={visible} 
          onDismiss={hideModal} 
          contentContainerStyle={containerStyle}
          style={styles.modalStyle}>

          
          <TouchableOpacity
            onPress={hideModal}
            style={[{marginTop: 300}]}
            >
              <Button 
                icon="close"
                style={styles.closeIcon}
                textColor="red">
                
              </Button>

          </TouchableOpacity>
          <Image 
            style={styles.imageStyle}
            source={{uri: playerPic }}></Image>

          <Text 
            style={styles.textInModal}
            adjustsFontSizeToFit={true}
            allowFontScaling={true}
            numberOfLines={1}>{displayName}</Text>
          <Text style={[styles.textInModal, {fontSize: 15, marginTop: 15}]}>Position: {playerPos}</Text>
          <Text style={[styles.textInModal, {fontSize: 15, marginTop: 15}]}>Team: {team}</Text>
          <Text style={[styles.textInModal, {fontSize: 15, marginTop: 15}]}>Year: {playerYear}</Text>
          <Text style={[styles.textInModal, {fontSize: 15, marginTop: 15}]}>Number owned: {displayQuantity}</Text>

          <View style={[{flexDirection: 'row'}]}>
            <TouchableOpacity>
              <Button
                textColor='white'
                buttonColor='green'  
                mode="contained"
                style={styles.buttonInModal}
                onPress={addPlayer}
              >BUY</Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                textColor='white'
                buttonColor='red'  
                mode="contained"
                style={styles.buttonInModal}
                onPress={sellPlayer}
              >SELL</Button>
            </TouchableOpacity>

            <TextInput
              style={[{borderWidth: 1}, {bottom: 365}, {left: 40}, {width: 70}, {padding: 20}, {color: 'black'}, {fontSize: 20}]}
              placeholderTextColor="white"
              color="black"
              backgroundColor="white"
              onChangeText={(value) => {
                setTransQuantity(value * 1)
                console.log(transQuantity)
              }}
            />
          </View>

          <View style={[{width: 350}, {backgroundColor: '#6C6B6B'}, {alignSelf: 'center'}, {bottom: 350}, {height: 100}, {borderRadius: 25}, {flexDirection: 'row'}]}>
            <View style={[{flexDirection: 'column'}]}>
              <Text style={[{fontSize: 25}, {marginLeft: 30}, {marginTop: 20}, {fontWeight: 'bold'}, {color: 'white'}]}>PPG</Text>
              <Text style={[{fontSize: 20}, {marginLeft: 28}, {marginTop: 10}, {color: 'white'}, {alignSelf: 'center'}]}>{PPG}</Text>
              
            </View>

            <View style={[{flexDirection: 'column'}]}>
              <Text style={[{fontSize: 25}, {marginLeft: 30}, {marginTop: 20}, {fontWeight: 'bold'}, {color: 'white'}]}>APG</Text>
              <Text style={[{fontSize: 20}, {marginLeft: 40}, {marginTop: 10}, {color: 'white'}, {alignSelf: 'center'}]}>{APG}</Text>
            </View>

            <View style={[{flexDirection: 'column'}]}>
              <Text style={[{fontSize: 25}, {marginLeft: 30}, {marginTop: 20}, {fontWeight: 'bold'}, {color: 'white'}]}>RPG</Text>
              <Text style={[{fontSize: 20}, {marginLeft: 40}, {marginTop: 10}, {color: 'white'}, {alignSelf: 'center'}]}>{RPG}</Text>
            </View>

            <View style={[{flexDirection: 'column'}]}>
              <Text style={[{fontSize: 25}, {marginLeft: 27.5}, {marginTop: 20}, {fontWeight: 'bold'}, {color: 'white'}]}>FG%</Text>
              <Text style={[{fontSize: 20}, {marginLeft: 27.5}, {marginTop: 10}, {color: 'white'}, {alignSelf: 'center'}]}>{FG}%</Text>
            </View>
          </View>

          <View style={[{width: 350}, {backgroundColor: '#6C6B6B'}, {alignSelf: 'center'}, {bottom: 340}, {height: 230}, {borderRadius: 25}]}>
            <Text style={[{fontSize: 40}, {color: 'white'}, {fontWeight: 'bold'}, {top: 80}, {alignSelf: 'center'}]}>SC {playerSC}</Text>
          </View>
        </Modal>
      </Portal>
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="Search players....."
          placeholderTextColor="white"
          color="white"
          onChangeText={(value) => setPlayer(value)}
        />

        <Button 
          icon="magnify" 
          mode="contained" 
          buttonColor='#20526B'
          style={styles.button}
          onPress={() => getPlayer(player)}>
            SEARCH
        </Button>
        
        {players}
        <PlayerPreview
          PPG={PPG}
          RPG={RPG}
          APG={APG}
          FG={FG}
          team={team}
          playerPic={playerPic}
          displayName={displayName}
          onPress={() => showModal()}
        >

        </PlayerPreview>
      </View>
    </Provider>
  );

  function getPlayer(player){
    getID(player);
  }

  function getID(player){
    console.log("input player name from UI: %s", player)
    inputID = '28336662792'

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '414e39efb2msh611f4a40a947106p1c473bjsn2988cfa9f72f',
        'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
      }
    };
  
    fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo?playerName=${player}`, options)
      .then(response => response.json())
      .then(data => {
        var testDict2 = eval(data).body
        if(testDict2.length != 0){
          
          inputID = testDict2[0].playerID;
          
          console.log(testDict2[0].bRefName)
          setDisplayName(testDict2[0].bRefName)
          setPlayerPic(testDict2[0].espnHeadshot)
          setPlayerPos(testDict2[0].pos)

          const tempYear = testDict2[0].exp
          if (tempYear == "R"){
            setPlayerYear(0)
          } else {
            setPlayerYear(tempYear)
          }

          setTeam(testDict2[0].team)
            
          console.log("response from API, input ID : %s", inputID)
          getStats(inputID)

        } else {
          Alert.alert("Error", "Invalid player")
        }
      })
  
      //.then(response => console.log("raw response of player ID query: %s ", response))
      .catch(err => console.error(err));


  }

  function getStats(ID){
    let GameNum = 0;
    //console.log("Hi")

    PointsNum = 0;
    AssistNum = 0;
    ReboundNum = 0;
    FGTotal = 0;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '414e39efb2msh611f4a40a947106p1c473bjsn2988cfa9f72f',
        'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
      }
    };

    console.log("Querying statistics for the player ID = %s ", ID)
    fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAGamesForPlayer?playerID=${ID}&season=2023`, options)
      .then(response => response.json())
      .then(data => {
        console.log("Recieved response for stats")
        var testDict = eval(data).body
       
        let count = 0; 
        for (key in testDict){
          if (testDict.hasOwnProperty(key)) {

            let indicator = true;

            if (indicator){
              tempPTS = parseInt(testDict[key].pts)
              tempATS = parseInt(testDict[key].ast)
              tempRPG = parseInt(testDict[key].reb)
              tempFG = parseInt(testDict[key].fgp)

              if(!isNaN(tempPTS)){
                //console.log(tempPTS)
                PointsNum += (tempPTS)
              }

              if(!isNaN(tempATS)){
                //console.log(tempATS)
                AssistNum += (tempATS)
              }

              if(!isNaN(tempRPG)){
                //console.log(tempRPG)
                ReboundNum += (tempRPG)
              }

              if(!isNaN(tempFG)){
                //console.log(tempFG)
                FGTotal += (tempFG)
              }

              GameNum++;
              //console.log(PointsNum + " " + GameNum + " " + key)
              count++;
            }

          }
        }

        setPPG((PointsNum/GameNum).toFixed(2));
        setRPG((ReboundNum/GameNum).toFixed(2));
        setAPG((AssistNum/GameNum).toFixed(2));
        setFG((FGTotal/GameNum).toFixed(2));

        console.log(6*(PPG*1 + RPG*1 + (1.4*APG) + (0.8*FG)))
        
        const newSC = (6*(PPG*1 + RPG*1 + (1.4*APG) + (0.8*FG))).toFixed(2)
        setPlayerSC(newSC);
        console.log(playerSC)
        setDefaultStatus(false);
        

        /* setPPGPSN((PointsNumPSN/GameNumPSN).toFixed(2));
        setRPGPSN((ReboundNumPSN/GameNumPSN).toFixed(2));
        setAPGPSN((AssistNumPSN/GameNumPSN).toFixed(2));
        setFGPSN((FGTotalPSN/GameNumPSN).toFixed(2));
        
         */
      }).catch(error => console.error(error));
      //console.log(PointsNum/GameNum)
  }

  async function addPlayer(){
    userRef = doc(db, 'users', user.uid);
    const docSnapUser = await getDoc(userRef);
    const tempBalance = docSnapUser.data().userBalance;

    if (defaultStatus){
      Alert.alert("Error", "No player selected. Please enter in a player name.")
    } else {
      console.log(transQuantity * playerSC)
      if (transQuantity * playerSC > tempBalance * 1){
        Alert.alert("Error", "Balance is insufficient")
      } else if (transQuantity < 1){
        Alert.alert("Error", "Quantity must be a positive integer that is at least 1")
      } else if (Math.floor(transQuantity) !== transQuantity){
        Alert.alert("Error", "Quantity must be a positive integer that is at least 1")
      } else {
        const playerCollection = collection(userRef, "players")
        console.log("Step 1")

        const newQuery = query(playerCollection, where("nameOfPlayer", "==", displayName));
        const querySnapshot = await getDocs(newQuery);
        
        console.log("Step 2")
        const hasMatch = !querySnapshot.empty;

        let tempQuantity = 0;
        let remainingBalance = 0;

        remainingBalance = tempBalance.toFixed(2) - ((playerSC*transQuantity).toFixed(2))

        if (hasMatch){
          const playerRef = doc(playerCollection, displayName);
          const docSnapPlayer = await getDoc(doc(db, "users", user.uid, "players", displayName));
          
          console.log(docSnapPlayer)

          console.log(docSnapPlayer.data())
          tempQuantity = docSnapPlayer.data().quantity;
          
          console.log("Step 3")
          await updateDoc(playerRef, {
            quantity: tempQuantity + transQuantity,
            thenSC: playerSC
          })
          setDisplayQuantity(tempQuantity + transQuantity)
          await updateDoc(userRef, {
            userBalance: remainingBalance
          })
          console.log("Step 4")
        } else {
          await setDoc(doc(db, "users", user.uid, "players", displayName), {
            nameOfPlayer: displayName,
            playerID: inputID,
            thenSC: playerSC,
            quantity: transQuantity,
            PPG: PPG,
            APG: APG,
            RPG: RPG,
            FG: FG,
            team: team,
            playerPic: playerPic,
          })
          await updateDoc(userRef, {
            userBalance: remainingBalance
          })
          console.log("Step 3")
          setDisplayQuantity(transQuantity)
        }
        Alert.alert("Success", "Transaction Complete");
      }
    }
  }

  async function sellPlayer(){
    if (defaultStatus){
      Alert.alert("Error", "No player selected. Please enter in a player name.")
    } else {
      if (transQuantity < 1){
        Alert.alert("Error", "Quantity must be a positive integer that is at least 1.")
      } else if (Math.floor(transQuantity) !== transQuantity){
        Alert.alert("Error", "Quantity must be a positive integer that is at least 1.")
      } else {
        userRef = doc(db, 'users', user.uid);
        const playerCollection = collection(userRef, "players")
        console.log("Step 1")

        const newQuery = query(playerCollection, where("nameOfPlayer", "==", displayName));
        const querySnapshot = await getDocs(newQuery);
        
        console.log("Step 2")
        const hasMatch = !querySnapshot.empty;
        if (hasMatch){
          const playerRef = doc(playerCollection, displayName);
          const docSnapPlayer = await getDoc(playerRef);
          const docSnapUser = await getDoc(userRef);

          const tempQuantity = docSnapPlayer.data().quantity;
          console.log("Step 2.5")
          console.log(docSnapUser.data())
          const tempBalance = docSnapUser.data().userBalance * 1;
          
          console.log(tempQuantity + " " + tempBalance)

          const remainingBalance = tempBalance + (playerSC*tempQuantity)

          console.log("Step 3")
          if (tempQuantity > transQuantity){
            await updateDoc(playerRef, {
              quantity: tempQuantity - transQuantity,
              thenSC: playerSC
            })
            console.log("Step 4 (Reduce)")
            await updateDoc(userRef, {
              userBalance: remainingBalance
            })
            console.log("Step 5 (Reduce)")
            setDisplayQuantity(tempQuantity - transQuantity)
            Alert.alert("Success", "Transaction Complete")
          } else if (tempQuantity === transQuantity){
            await deleteDoc(playerRef);
            console.log("Step 4 (Delete)")
            await updateDoc(userRef, {
              userBalance: remainingBalance
            })
            console.log("Step 5 (Delete)")
            setDisplayQuantity(0)
            Alert.alert("Success", "Transaction Complete")
          } else {
            Alert.alert("Error", "You own less of this player than what you can sell.")
          }
        } else{
          Alert.alert("Error", "Player not found. You can only sell players who you have already brought.")
        }
      }
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
    height: 42,
    width: 310,
    margin: 12,
    marginBottom: 450,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#20526B',
    color: 'black'
  },
  button: {
    bottom: 450,
    marginBottom: -150,
    marginTop: 50,
  },
  modalStyle: {
    //right: '10%',
    top: -20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 0.7
  },
  imageStyle: {
    width: '40%', 
    height: '20%', 
    padding: 0, 
    left: -100, 
    bottom: 250, 
    resizeMode: 'cover', 
    alignSelf: 'center', 
    right: '0%',
    marginTop: 50,
  },
  closeIcon: {
    color: "red",
    flexDirection: 'row',
    bottom: 170,
    marginTop: 50,
    left: 330,
    height: 55,
    width: 55,    
    justifyContent: 'center',
  },
  textInModal: {
    fontSize: 20,
    bottom: 400,
    left: 190,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonInModal:{
    width: 100,
    fontWeight: 'bold',
    bottom: 350,
    marginLeft: 25,
  }
});



