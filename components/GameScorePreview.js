import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper'

function GameScorePreview(){
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
        height: 80,
    }
})

export default GameScorePreview;