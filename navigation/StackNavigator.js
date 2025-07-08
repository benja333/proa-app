import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MenuScreen from '../screens/MenuScreen';
import FormScreen from '../screens/FormScreen';
import NuevoRegistro from '../screens/NuevoRegistro';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Form" component={FormScreen} />
      <Stack.Screen name="NuevoRegistro" component={NuevoRegistro} options={{ title: 'Nuevo Registro' }} />
    </Stack.Navigator>
  );
}
