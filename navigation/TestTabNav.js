import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import BalanceScreen from '../screens/BalanceScreen';

//Screen names
const homeName = "Home";
const discoverName = "Discovery";
const portfolioName = "Portfolio";
const balanceName = "Balance";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === discoverName) {
              iconName = focused ? 'ios-search' : 'ios-search-outline';

            } else if (rn == balanceName) {
              iconName = focused ? 'cash' : 'cash-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: '#3585AE',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: -20, fontSize: 10, marginTop: -10},
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={discoverName} component={DiscoveryScreen} />
        <Tab.Screen name={balanceName} component={BalanceScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;