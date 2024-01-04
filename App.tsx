// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNThumbnails from './RNThumbnails';
import GeoLocationService from './GeoLocationService';

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="RN Thumbnails"
        onPress={() => navigation.navigate('RNThumbnails')}
      />
      <Button
        title="RN Geolocation services"
        onPress={() => navigation.navigate('GeoLocationService')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RNThumbnails" component={RNThumbnails} />
        <Stack.Screen
          name="GeoLocationService"
          component={GeoLocationService}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
