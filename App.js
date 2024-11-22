import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/HomeScreen';

import MovieDetailsScreen from './screens/MovieDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}  initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Home} />
        <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}