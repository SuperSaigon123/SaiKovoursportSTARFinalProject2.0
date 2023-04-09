import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, useState, TextInput} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../utils/hooks/useAuth';
import { Button } from 'react-native-elements';
import GameScorePreview from '../components/GameScorePreview';

let PointsNum = 0;
let AssistNum = 0;
let ReboundNum = 0;
let FGTotal = 0;

const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuth();
  
  const [player, setPlayer] = React.useState('Kevin Durant');
  const [PPG, setPPG] = React.useState(0);
  const [RPG, setRPG] = React.useState(0);
  const [APG, setAPG] = React.useState(0);
  const [FG, setFG] = React.useState(0);

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

      <View style={styles.tempViewForAPI}>
        <Text style={[{color: 'white'}, {fontSize: 20}]}>PPG: {PPG}</Text>
        <Text style={[{color: 'white'}, {fontSize: 20}]}>APG: {APG}</Text>
        <Text style={[{color: 'white'}, {fontSize: 20}]}>RPG: {RPG}</Text>
        <Text style={[{color: 'white'}, {fontSize: 20}]}>FG%: {FG}</Text>

        <TextInput
          style={[{borderWidth: 1}, {height: 40}, {width: 200}, {marginTop: 40}, {padding: 20}, {backgroundColor: 'white'}]}
          placeholder="Search a player"
          placeholderTextColor="black"
          color="black"
          onChangeText={(value) => setPlayer(value)}
        />
        
      </View>

      <Text style={[{color: 'white'}]}>Welcome {user?.email}!</Text>
      <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
      <Button title="Test API" style={styles.button} onPress={() => getID(player)} />

    </View>
  );

  function getID(player){
    let inputID = '28978646789'

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '414e39efb2msh611f4a40a947106p1c473bjsn2988cfa9f72f',
        'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
      }
    };

    let spaceIndex = player.indexOf(" ")
    let playerFirstName = player.substring(0, spaceIndex);
    let playerLastName = player.substring(spaceIndex + 1);
  
    fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo?playerName=${player}`, options)
      .then(response => response.json())
      .then(data => {
        var testDict2 = eval(data).body
        console.log(testDict2[0])
        inputID = testDict2[0].playerID;
        console.log(inputID)
      })
  
      .then(response => console.log(response))
      .catch(err => console.error(err));

    getStats(inputID)
  }

  function getStats(ID){
    let GameNum = 0;
    console.log("Hi")

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '414e39efb2msh611f4a40a947106p1c473bjsn2988cfa9f72f',
        'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
      }
    };

    console.log(ID)
    fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAGamesForPlayer?playerID=${ID}&season=2023`, options)
      .then(response => response.json())
      .then(data => {
        var testDict = eval(data).body
        console.log(testDict)
        
        let count = 0; 
        for (key in testDict){
          if (testDict.hasOwnProperty(key)) {
            //console.log(key+': ' +testDict[key])
            PointsNum += (testDict[key].pts) * 1
            AssistNum += (testDict[key].ast) * 1
            ReboundNum += (testDict[key].reb) * 1
            FGTotal += (testDict[key].fgp) * 1
            GameNum++;
            count++;
          }
        }
  
        setPPG(PointsNum/GameNum);
        setRPG(ReboundNum/GameNum);
        setAPG(AssistNum/GameNum);
        setFG(FGTotal/GameNum);
  
        /*
        console.log(data.body)
        console.log(Object.keys(data.body).length)
        */
        //PointsNum = 
  
        /*
        data.body.map(item => {
          console.log(item)
        })
        */
        
        //.reduce(sumReducer, 0);
      }).catch(error => console.error(error));
      console.log(PointsNum/GameNum)
  }
}

function sumReducer(sum, val){
  return sum + val;
}


/*
function testAPI(player) {
  let inputID = '28336662792'

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '414e39efb2msh611f4a40a947106p1c473bjsn2988cfa9f72f',
      'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
    }
  };

  let spaceIndex = player.indexOf(" ")
  let playerFirstName = player.substring(0, spaceIndex);
  let playerLastName = player.substring(spaceIndex + 1);

  fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAPlayerInfo?playerName=${player}`, options)
	  .then(response => response.json())
    .then(data => {
      var testDict2 = eval(data).body
      inputID = testDict2[key].playerID;
    })

	  .then(response => console.log(response))
	  .catch(err => console.error(err));

  let GameNum = 0;
  
  
  fetch(`https://tank01-fantasy-stats.p.rapidapi.com/getNBAGamesForPlayer?playerID=${inputID}&season=2023`, options)
    .then(response => response.json())
    .then(data => {
      var testDict = eval(data).body
      
      let count = 0; 
      console.log("1")
      for (key in testDict){
        if (testDict.hasOwnProperty(key)) {
          //console.log(key+': ' +testDict[key])
          PointsNum += (testDict[key].pts) * 1
          AssistNum += (testDict[key].ast) * 1
          ReboundNum += (testDict[key].reb) * 1
          FGTotal += (testDict[key].fgp) * 1
          GameNum++;
          count++;
        }
      }
      
      console.log(count)
      console.log(PointsNum)
      console.log(PointsNum/GameNum)

      setPPG(PointsNum/GameNum);
      setRPG(ReboundNum/GameNum);
      setAPG(AssistNum/GameNum);
      setFG(FGTotal/GameNum);
      
      //.reduce(sumReducer, 0);
    }).catch(error => console.error(error));
    console.log(PointsNum/GameNum)
}
*/

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