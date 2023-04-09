import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper'



function GameScorePreview({team1, team2}){
    <TouchableRipple
        style={styles.GSP}
        onPress={() => console.log('pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
    >
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
    </TouchableRipple>
}

const styles = StyleSheet.create({
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
})

export default GameScorePreview;