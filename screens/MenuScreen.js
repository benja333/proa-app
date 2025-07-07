import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  const goToForm = (modo) => {
    navigation.navigate('Form', { modo });
  };

  return (
    <View style={styles.container}>
      <Button title="Nuevo" onPress={() => goToForm('Nuevo')} />
      <Button title="Modificar" onPress={() => goToForm('Modificar')} />
      <Button title="Eliminar" onPress={() => goToForm('Eliminar')} />
      <Button title="Consultar" onPress={() => goToForm('Consultar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 16,
  },
});
