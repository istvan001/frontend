import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Etlapok from './Etlapok';
import Asztalok from './Asztalok';
import Ettermek from  './Ettermek';

const Tab = createBottomTabNavigator();

export default class App extends Component {
  render(){
    return(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Éttermek" component={HomeScreen} options={{
              tabBarLabel: "Kezdőlap",
              tabBarIcon: () => (
                <Ionicons name="home" size={24} color="black"/>
              ),
            }}/>
          <Tab.Screen name="Étlapok" component={EtlapScreen} options={{
            tabBarIcon: () => (
              <MaterialIcons name="restaurant-menu" size={24} color="black"/>
            ),
          }} />
          <Tab.Screen name="Asztalok" component={AsztalokScreen} options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="table-chair" size={24} color="black"/>
            ),
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

function HomeScreen({ navigation }) {
  return(
    <Ettermek />
  );
}

function EtlapScreen({ navigation }) {
  return (
    <Etlapok />
  );
}

function AsztalokScreen({ navigation }) {
  return (
    <Asztalok />
  );
}