import * as React from 'react';
import { View, Text, StyleSheet, TextInput, useState, Image, Alert} from 'react-native';
import {Button} from 'react-native-paper'

import PlayerPreview from '../components/PlayerPreview';

let PointsNum = 0;
let AssistNum = 0;
let ReboundNum = 0;
let FGTotal = 0;

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

  return (
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
        onPress={() => Alert.alert(player)}
      >

      </PlayerPreview>

    </View>

    
  );

  function getPlayer(player){
    getID(player);
  }

  function getID(player){
    console.log("input player name from UI: %s", player)
    let inputID = '28336662792'

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '414e39efb2msh611f4a40a947106p1c473bjsn2988cfa9f72f',
        'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
      }
    };

    /*
    let spaceIndex = player.indexOf(" ")
    let playerFirstName = player.substring(0, spaceIndex);
    let playerLastName = player.substring(spaceIndex + 1);
    */
  
    fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo?playerName=${player}`, options)
      .then(response => response.json())
      .then(data => {
        var testDict2 = eval(data).body
        if(testDict2.length != 0){
        
        //console.log(testDict2[0])
        inputID = testDict2[0].playerID;
        //console.log(testDict2)
        setPlayer(testDict2[0].bRefName)
        setPlayerPic(testDict2[0].espnHeadshot)
        setTeam(testDict2[0].team)
          
        console.log("response from API, input ID : %s", inputID)
        getStats(inputID)
        } else {
          console.log("Invalid player")
        }
      })
  
      //.then(response => console.log("raw response of player ID query: %s ", response))
      .catch(err => console.error(err));


  }

  function getStats(ID){
    let GameNum = 0;
    let GameNumPSN = 0;
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
        //console.log(testDict)
       
        let count = 0; 
        for (key in testDict){
          if (testDict.hasOwnProperty(key)) {

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

        setPPG((PointsNum/GameNum).toFixed(2));
        setRPG((ReboundNum/GameNum).toFixed(2));
        setAPG((AssistNum/GameNum).toFixed(2));
        setFG((FGTotal/GameNum).toFixed(2));

        setDisplayName(player)

        /* setPPGPSN((PointsNumPSN/GameNumPSN).toFixed(2));
        setRPGPSN((ReboundNumPSN/GameNumPSN).toFixed(2));
        setAPGPSN((AssistNumPSN/GameNumPSN).toFixed(2));
        setFGPSN((FGTotalPSN/GameNumPSN).toFixed(2));
        
        setDisplayName(player); */
      }).catch(error => console.error(error));
      //console.log(PointsNum/GameNum)
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
    marginBottom: 500,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#20526B',
    color: 'black'
  },
  button: {
    bottom: 450,
    marginBottom: -60,
  }
});


