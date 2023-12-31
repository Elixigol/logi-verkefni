import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Screens
import DepartureScreen from './screens/DepartureScreen';
import GasScreen from './screens/GasScreen';
import ArrivalsScreen from './screens/ArrivalsScreen';

//Screen name
const gasName = "Gas Stations";
const departureName = "Departures";
const settingsName = "Arrivals";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={gasName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === departureName) {
              iconName = focused ? 'airplane' : 'airplane-outline';
            } 

            else if (rn === gasName) {
              iconName = focused ? 'car' : 'car-outline';
            }

            else if (rn === settingsName) {
              iconName = focused ? 'airplane' : 'airplane-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={gasName} component={GasScreen} />
        <Tab.Screen name={settingsName} component={ArrivalsScreen} />
        <Tab.Screen name={departureName} component={DepartureScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;