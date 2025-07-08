import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { auth } from '../firebase/firebaseConfig';

export default function MenuScreen({ navigation }) {
  const email = auth.currentUser?.email;
  const goToForm = (modo) => {
    navigation.navigate('Form', { modo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Hola, {email}!</Text>
      <Button title="Nuevo" onPress={() => navigation.navigate('NuevoRegistro')} />
      <Button title="Modificar" onPress={() => goToForm('Modificar')} />
      <Button title="Eliminar" onPress={() => goToForm('Eliminar')} />
      <Button title="Consultar" onPress={() => goToForm('Consultar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 20,
  },
});
