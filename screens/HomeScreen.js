import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../utils/hooks/useAuth';
import { Button } from 'react-native-elements';
import GameScorePreview from '../components/GameScorePreview';

import MavsLogo from '../assets/testimages/mavslogotest.png'
import NuggetsLogo from '../assets/testimages/nuggetslogotest.png'

const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.scoresView}>
      <Image source={require('../assets/testimages/mavslogotest.png')} style={styles.teamLogos}></Image>
        <SafeAreaView>
          <View style={styles.GSP}>
            <Text style={styles.GSPInside}>DAL</Text>
            <Text style={styles.GSPInside}>DEN</Text>
          </View>
        </SafeAreaView>

        {/*
        <GameScorePreview>

        </GameScorePreview>
  */}

      </View>

      <View style={styles.playersView}>

      </View>

      <View style={styles.risersView}>

      </View>

      <Text style={[{color: 'white'}]}>Welcome {user?.email}!</Text>
      <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />

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
  GSP: {
    backgroundColor: 'white',
    width: 160,
    height: 86,
    borderRadius: 20,
  },
  GSPInside: {
    padding: 10,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  teamLogos: {
    width: 30,
    height: 30,
  }
});