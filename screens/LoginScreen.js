import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login exitoso:', user.email);
      navigation.replace('Menu'); // redirige a la pantalla principal
    } catch (err) {
      console.log('Error al iniciar sesión:', err.message);
      setError(err.message);
      Alert.alert('Error de inicio de sesión', err.message);
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        on
