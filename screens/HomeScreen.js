import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../utils/hooks/useAuth';
import { Button } from 'react-native-elements';
import GameScorePreview from '../components/GameScorePreview';

const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.scoresView}>
        <SafeAreaView>
          <View style={styles.GSP}>
            <View style={styles.GSPMini}>
              <Image source={require('../assets/testimages/mavslogotest.png')} style={styles.teamLogos}></Image>
              <Text style={styles.GSPInside}>DAL</Text>
            </View>

            <View style={[styles.GSPMini, {marginTop: 40}]}>
              <Image source={require('../assets/testimages/nuggetslogotest.png')} style={styles.teamLogos}></Image>
              <Text style={styles.GSPInside}>DEN</Text>
            </View>

            
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
  },
  teamLogos: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 5
  }
});