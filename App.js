import * as React from 'react';
import './config/firebase';
import RootNavigation from './navigation';

/*
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.selectEntry}>
        <Button
          mode='text'
          textColor='white'
          style={styles.headlineText}
          onPress={() => SwitchEntry(1)}
        >
          SIGN UP
        </Button>
        <Button
          mode='text'
          textColor='white'
          style={styles.headlineText}
          onPress={() => SwitchEntry(2)}
        >
          LOG IN
        </Button>
      </View>
      <View style={[styles.inputContainer, {bottom: 200}]}>
        <TextInput
          editable
          numberOfLines={1}
          placeholder='USERNAME'
          //value={username}
          style={styles.accountInput}
        />
      </View>
      <View style={[styles.inputContainer, {bottom: 100}]}>
        <TextInput
          editable
          numberOfLines={1}
          placeholder='PASSWORD'
          secureTextEntry
          //value={password}
          style={styles.accountInput}
        />
      </View>

      <View style={styles.button}>
        <Button 
          title='Next Page.....'
          onPress={() => navigation.navigate('Details')
        }
          buttonColor='#3585AE'
          textColor='white'
          mode='contained'
        >
          Next Page......
        </Button>
      </View>
    </View>
  )
}

function SwitchEntry(entryNum) {
  if (entryNum == 1){
    entryType = 1;
  } else if (entryNum == 2){
    entryType = 2;
  }
  console.log(entryType);
}

const Stack = createNativeStackNavigator();

*/

export default function App() {
  return (
    <RootNavigation />
  );
}

