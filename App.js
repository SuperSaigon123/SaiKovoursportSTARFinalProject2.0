import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import './config/firebase';
import RootNavigation from './navigation';

export default function App() {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  );
}



