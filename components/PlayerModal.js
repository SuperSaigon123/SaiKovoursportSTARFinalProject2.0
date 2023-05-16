import * as React from 'react';
import { View, Text, StyleSheet, TextInput, useState, Image, Alert, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import {Button, Modal, Provider, Portal} from 'react-native-paper'

function PlayerModal(visible, onDismiss, contentContainerStyle, playerPic, displayName, PPG, APG, RPG, FG, playerPos, team){
    return (
        <Modal 
          visible={visible} 
          onDismiss={onDismiss} 
          contentContainerStyle={contentContainerStyle}
          style={styles.modalStyle}>

          
          <TouchableOpacity
            onPress={onDismiss}
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
          <Text style={[styles.textInModal, {fontSize: 15, marginTop: 15}]}>Postseason: </Text>
          <Text style={[styles.textInModal, {fontSize: 15, marginTop: 15}]}>Year: </Text>

          <View style={[{flexDirection: 'row'}]}>
            <TouchableOpacity>
              <Button
                textColor='white'
                buttonColor='green'  
                mode="contained"
                style={styles.buttonInModal}
              >BUY</Button>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                textColor='white'
                buttonColor='red'  
                mode="contained"
                style={styles.buttonInModal}
              >SELL</Button>
            </TouchableOpacity>

            <TextInput
              style={[{borderWidth: 1}, {bottom: 365}, {left: 40}, {width: 70}, {padding: 20}, {color: 'black'}, {fontSize: 20}]}
              placeholder=""
              placeholderTextColor="white"
              color="black"
              backgroundColor="white"
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
            <Text style={[{fontSize: 40}, {color: 'white'}, {fontWeight: 'bold'}, {padding: 20}]}>SC 100</Text>
          </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
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
})

export default PlayerModal;