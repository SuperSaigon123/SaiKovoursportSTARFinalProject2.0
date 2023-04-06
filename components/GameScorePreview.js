import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper'



function GameScorePreview({team1, team2}){
    <TouchableRipple
        style={styles.GSP}
        onPress={() => console.log('pressed')}
        rippleColor="rgba(0, 0, 0, .32)"
    >

    </TouchableRipple>
}

const styles = StyleSheet.create({
    GSP: {
        backgroundColor: 'white',
        width: 160,
        height: 86,
        borderRadius: 20,
    }
})

export default GameScorePreview;