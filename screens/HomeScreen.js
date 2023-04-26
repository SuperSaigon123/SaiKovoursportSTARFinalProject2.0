import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, useState, TextInput, KeyboardAvoidingView} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../utils/hooks/useAuth';
import { Button } from 'react-native-elements';
import GameScorePreview from '../components/GameScorePreview';

let PointsNum = 0;
let AssistNum = 0;
let ReboundNum = 0;
let FGTotal = 0;

let PointsNumPSN = 0;
let AssistNumPSN = 0;
let ReboundNumPSN = 0;
let FGTotalPSN = 0;

const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuth();
  
  const [player, setPlayer] = React.useState('Player Name');
  const [PPG, setPPG] = React.useState(0);
  const [RPG, setRPG] = React.useState(0);
  const [APG, setAPG] = React.useState(0);
  const [FG, setFG] = React.useState(0);
  const [playerPic, setplayerPic] = React.useState('https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png')

  const [PPGPSN, setPPGPSN] = React.useState(0);
  const [RPGPSN, setRPGPSN] = React.useState(0);
  const [APGPSN, setAPGPSN] = React.useState(0);
  const [FGPSN, setFGPSN] = React.useState(0);

  const [displayName, setDisplayName] = React.useState('Player Name')
  

  return (
    <View style={styles.container}>
      <View style={styles.scoresView}>
        <SafeAreaView>
          <View style={styles.GSP}>
            <View style={styles.GSPMini}>
              <Image source={require('../assets/testimages/mavslogotest.png')} style={styles.teamLogos}></Image>
              <Text style={styles.GSPInside}>DAL</Text>
              <Text style={[styles.GSPInside, {fontSize: 11}, {color: 'grey'}, {marginLeft: -25}, {marginTop: -5}]}>(31-28)</Text>
            </View>

            <View style={[styles.GSPMini, {marginTop: 40}]}>
              <Image source={require('../assets/testimages/nuggetslogotest.png')} style={styles.teamLogos}></Image>
              <Text style={styles.GSPInside}>DEN</Text>
              <Text style={[styles.GSPInside, {fontSize: 11}, {color: 'grey'}, {marginLeft: -25}, {marginTop: -5}]}>(40-18)</Text>
            </View>

            
          </View>
        </SafeAreaView>

      </View>

      <View style={styles.playersView}>

      </View>

      <View style={styles.risersView}>

      </View>

      <KeyboardAvoidingView style={styles.tempViewForAPI}>
        <TextInput
          style={[{borderWidth: 1}, {width: 200}, {marginTop: 40}, {padding: 20}, {color: 'black'}]}
          editable
          backgroundColor="white"
          placeholder="Search a player"
          selectionColor="black"
          onChangeText={(value) => setPlayer(value)}
        />

        <View style={[styles.GSP, {top: 50}, {width: 328}, {padding: 0}]}>
          <Image
            style={{width: '25%', height: '100%', padding: 0, right: -10, bottom: 5, resizeMode: 'cover'}}
            source={{uri: playerPic }}
          >
          </Image>

          <View style={{flexWrap: 'wrap'}}>
            <Text style={[{color: 'black'}, {fontSize: 20}, {fontWeight: 'bold'}, {bottom: 80}, {marginLeft: 130}]}>{displayName}</Text>
            <Text style={[{color: 'black'}, {fontSize: 15}, {fontWeight: 'bold'}, {bottom: 75}, {marginLeft: 100}]}>{PPG} PPG, {RPG} RPG {'\n'} {APG} APG, {FG}% FG</Text>
          </View>
          
        </View>
        
      </KeyboardAvoidingView>

      <Text style={[{color: 'white'}]}>Welcome {user?.email}!</Text>
      <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
      <Button title="Test API" style={styles.button} onPress={() => getPlayer(player)} />

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
        setplayerPic(testDict2[0].espnHeadshot)
          
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

    PointsNumPSN = 0;
    AssistNumPSN = 0;
    ReboundNumPSN = 0;
    FGTotalPSN = 0;

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

        setPPGPSN((PointsNumPSN/GameNumPSN).toFixed(2));
        setRPGPSN((ReboundNumPSN/GameNumPSN).toFixed(2));
        setAPGPSN((AssistNumPSN/GameNumPSN).toFixed(2));
        setFGPSN((FGTotalPSN/GameNumPSN).toFixed(2));
        
        setDisplayName(player);
      }).catch(error => console.error(error));
      //console.log(PointsNum/GameNum)
  }

  function isRegSZN(gameID){
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '414e39efb2msh611f4a40a947106p1c473bjsn2988cfa9f72f',
        'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
      }
    };

    fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAGameInfo?gameID=${gameID}`, options)
      .then(response => response.json())
      .then(data => {
        var testDict = eval(data).body

        console.log(!((String)(testDict.SeasonType) === "Postseason"))
        return !((String)(testDict.SeasonType) === "Postseason")
        
      })
  
      //.then(response => console.log("raw response of player ID query: %s ", response))
      .catch(err => console.error(err));
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
    marginTop: 10
  },
  scoresView: {
    flex: 0.2,
  },
  playersView: {
    flex: 0.2
  }, 
  risersView: {
    flex: 0.2
  },
  tempViewForAPI: {
    marginBottom: 100,
    alignItems: 'center'
  },

  GSP: {
    backgroundColor: 'white',
    width: 160,
    height: 86,
    borderRadius: 20,
  },
  GSPMini: {
    flex: 0.1,
    flexDirection: 'row',
    width: 100,
  },

  GSPInside: {
    padding: 20,
    marginLeft: -10,
    marginTop: -7.5,
    fontWeight: 'bold',
    fontSize: 15
  },
  teamLogos: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 5
  }
});