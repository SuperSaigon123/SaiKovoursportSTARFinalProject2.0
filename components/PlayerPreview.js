import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native';

function PlayerPreview({PPG, RPG, APG, FG, displayName, playerPic, team, onPress}){
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
            >
            <Image
                style={{width: '25%', height: '100%', padding: 0, right: -10, bottom: 5, resizeMode: 'cover'}}
                source={{uri: playerPic }}
            ></Image>

            <View style={{flexWrap: 'wrap'}}>
                <Text style={[{color: 'black'}, {fontSize: 15}, {fontWeight: 'bold'}, {bottom: 80}, {marginLeft: 130}]}>{displayName} ({team})</Text>
                <Text style={[{color: 'black'}, {fontSize: 15}, {fontWeight: 'bold'}, {bottom: 75}, {marginLeft: 125}]}>{PPG} PPG, {RPG} RPG {'\n'} {APG} APG, {FG}% FG</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 328,
        height: 86,
        borderRadius: 20,
        padding: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        bottom: 350,
        marginTop: 40
    }
})
export default PlayerPreview;
